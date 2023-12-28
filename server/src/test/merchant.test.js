const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../database/models/index");
const { queryInterface } = sequelize;
const { GenerateToken } = require("../helpers/GenerateToken");
const { encryptMessageBody } = require("../helpers/Encrypt");
const { PasswordHashing } = require("../helpers/HashPassword");
const Redis = require("ioredis");
const redisClientMock = new Redis();
jest.mock("ioredis", () => require("ioredis-mock"));

const dummyMerchant = [
  {
    email: "gelorabungkarno@gmail.com",
    password: encryptMessageBody("adam123"),
  },
  {
    email: "gelora123@gmail.com",
    password: encryptMessageBody("adam123"),
  },
];

let token;
const tokenMock = "1209310kdowkpdow12323";

beforeAll((done) => {
  request(app)
    .post("/api/auth-merchant/login")
    .send(dummyMerchant[0])
    .then(({ body }) => {
      expect(body.message).toEqual("Success");
      expect(body.data).toHaveProperty("accessToken");
      token = body.data.accessToken;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  request(app)
    .post("/api/auth-merchant/logout")
    .set("authorization", `Bearer ${token}`)
    .then(({ body }) => {
      expect(body);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Get Merchant Profile", () => {
  test("Success Get Profile with status Success", (done) => {
    request(app)
      .get("/api/merchant/merchant-profile")
      .set("authorization", `Bearer ${token}`)
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        expect(body.data).toHaveProperty("name");
        expect(body.data).toHaveProperty("email");
        expect(body.data).toHaveProperty("password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Failed Get Profile with false token", (done) => {
    request(app)
      .get("/api/merchant/merchant-profile")
      .set("authorization", `Bearer 1232142141241241`)
      .then(({ body }) => {
        expect(body.message).toEqual("jwt malformed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Get Merchants", () => {
  test("should success with status Success", (done) => {
    request(app)
      .get("/api/merchant/")
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Get Merchant", () => {
  test("should success get merchant detail ", (done) => {
    request(app)
      .get("/api/merchant/1")
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("should failed with status merchant not found", (done) => {
    request(app)
      .get("/api/merchant/12")
      .then(({ body }) => {
        expect(body.message).toEqual("Merchant Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Update Password Merchant", () => {
  test("should success with status Success", (done) => {
    request(app)
      .patch("/api/merchant/update-password")
      .set("authorization", `Bearer ${token}`)
      .send({
        oldPassword: encryptMessageBody("adam123"),
        password: encryptMessageBody("adam123"),
        confirmPassword: encryptMessageBody("adam123"),
      })
      .then(({ body }) => {
        expect(body.message).toEqual("Update Success");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Delete Merchant", () => {
  test("Should failed merchant not found", (done) => {
    request(app)
      .delete("/api/merchant/delete")
      .set("authorization", `Bearer ${tokenMock}`)
      .then(({ body }) => {
        expect(body.message).toEqual("jwt malformed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
