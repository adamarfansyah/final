const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../database/models/index");
const { queryInterface } = sequelize;
const { GenerateToken } = require("../helpers/GenerateToken");
const { encryptMessageBody } = require("../helpers/Encrypt");
const { PasswordHashing } = require("../helpers/HashPassword");

const dummyUser = [
  {
    email: "adamsake8@gmail.com",
    password: encryptMessageBody("adam123"),
  },
  {
    email: "adamsake13@gmail.com",
    password: encryptMessageBody("adam123"),
  },
];

const mockBooking = [
  {
    venueId: 1,
    merchantId: 2,
    startTime: encryptMessageBody("2023-12-19T08:00"),
    endTime: encryptMessageBody("2023-12-19T09:00"),
  },
  {
    venueId: 1,
    merchantId: 2,
    startTime: encryptMessageBody("2023-12-19T21:00"),
    endTime: encryptMessageBody("2023-12-19T22:00"),
  },
  {
    venueId: 1,
    merchantId: 2,
    startTime: encryptMessageBody("2023-12-19T10:00"),
    endTime: encryptMessageBody("2023-12-19T11:00"),
  },
];

const mockPayment = [
  {
    merchantId: 2,
    venueId: 1,
    amount: 20000000,
    orderId: "Lapangan Testing 1-1702866864-2",
    transactionId: "24020590-783f-4c45-8c9e-8a1abad7d8c8",
    transactionTime: "2023-12-18T09:34:24",
    paymentType: "bank_transfer",
    startTime: encryptMessageBody("2023-12-19T08:00"),
    endTime: encryptMessageBody("2023-12-19T09:00"),
  },
  {
    merchantId: 2,
    venueId: 1,
    amount: 20000000,
    orderId: "Lapangan Testing 1-1702866864-2",
    transactionId: "24020590-783f-4c45-8c9e-8a1abad7d8c8",
    transactionTime: "2023-12-18T09:34:24",
    paymentType: "bank_transfer",
    startTime: encryptMessageBody("2023-12-20T08:00"),
    endTime: encryptMessageBody("2023-12-20T09:00"),
  },
];

let token;
const tokenMerchant =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImdlbG9yYSIsImVtYWlsIjoiZ2Vsb3JhQGdtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDAyOTM5MjM3NTctZjczNzEzNWEyMDJmP3E9ODAmdz0xODU0JmF1dG89Zm9ybWF0JmZpdD1jcm9wJml4bGliPXJiLT";

beforeAll((done) => {
  request(app)
    .post("/api/auth/login")
    .send(dummyUser[0])
    .then(({ body }) => {
      expect(body.message).toEqual("Success");
      expect(body.data).toHaveProperty("accessToken");
      token = body.data.accessToken;
      done();
    })
    .catch((err) => {
      done(err);
    });

  queryInterface.bulkInsert("Payments", mockPayment, {});
});

afterAll((done) => {
  request(app)
    .post("/api/auth/logout")
    .set("authorization", `Bearer ${token}`)
    .then(({ body }) => {
      expect(body);
      done();
    })
    .catch((err) => {
      done(err);
    });

  queryInterface.bulkDelete("Payments", null, {});
});

describe("Create Payment token User Auth", () => {
  test("Success create token payment", (done) => {
    request(app)
      .post("/api/transaction/payment-token")
      .set("authorization", `Bearer ${token}`)
      .send(mockBooking[2])
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        expect(body.data).toHaveProperty("token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Should failed because use token merchant", (done) => {
    request(app)
      .post("/api/transaction/payment-token")
      .set("authorization", `Bearer ${tokenMerchant}`)
      .send(mockBooking[2])
      .then(({ body }) => {
        expect(body.message).toEqual("jwt malformed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Should Error, request body is'nt correct", (done) => {
    request(app)
      .post("/api/transaction/payment-token")
      .set("authorization", `Bearer ${token}`)
      .send({
        venueId: 1,
        startTime: "2023-12-19T08:00",
        endTime: "2023-12-19T09:00",
      })
      .then(({ body }) => {
        expect(body.status).toEqual("Start Time or End Time is not valid");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Should Error, start is more than end time", (done) => {
    request(app)
      .post("/api/transaction/payment-token")
      .set("authorization", `Bearer ${token}`)
      .send({
        venueId: mockBooking[2].venueId,
        startTime: mockBooking[2].endTime,
        endTime: mockBooking[2].startTime,
      })
      .then(({ body }) => {
        expect(body.status).toEqual("Start is must be less than end time");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("should error, is out operational hours", (done) => {
    request(app)
      .post("/api/transaction/payment-token")
      .set("authorization", `Bearer ${token}`)
      .send({
        venueId: mockBooking[1].venueId,
        startTime: mockBooking[1].startTime,
        endTime: mockBooking[1].endTime,
      })
      .then(({ body }) => {
        expect(body.status).toEqual("Out of operational hours");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Create Payment for database", () => {
  test("should Success with data correct", (done) => {
    request(app)
      .post("/api/transaction/payment")
      .set("authorization", `Bearer ${token}`)
      .send(mockPayment[0])
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        expect(body.data).toHaveProperty("id");
        expect(body.data).toHaveProperty("transactionId");
        expect(body.data).toHaveProperty("orderId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("should Error, Venue Already Book", (done) => {
    request(app)
      .post("/api/transaction/payment")
      .set("authorization", `Bearer ${token}`)
      .send(mockPayment[0])
      .then(({ body }) => {
        expect(body.status).toEqual("Venue has booked at that time");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
