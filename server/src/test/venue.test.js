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

describe("Get Venue by Merchant Login", () => {
  test("Success Get venue by merchant login with status Success", (done) => {
    request(app)
      .get("/api/venue/merchant-venue")
      .set("authorization", `Bearer ${token}`)
      .then(({ body }) => {
        expect(body.data[0]).toHaveProperty("name");
        expect(body.data[0]).toHaveProperty("id");
        expect(body.data[0]).toHaveProperty("price");
        expect(body.data[0]).toHaveProperty("merchantId");
        expect(body.data[0]).toHaveProperty("startHour");
        expect(body.data[0]).toHaveProperty("endHour");
        expect(body.data[0]).toHaveProperty("image");
        expect(body.data[0]).toHaveProperty("status");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Failed Get venue by merchant login with token error", (done) => {
    request(app)
      .get("/api/venue/merchant-venue")
      .set("authorization", `Bearer 091ii2093skdpokwakpo2`)
      .then(({ body }) => {
        expect(body.message).toEqual("jwt malformed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Get Venue Operational Hours", () => {
  test("Should get operational hours Success ", (done) => {
    request(app)
      .get("/api/venue/operational/1")
      .then(({ body }) => {
        expect(body.data).toHaveProperty("operationalDates");
        expect(body.data).toHaveProperty("newTimeSlots");
        expect(body.data).toHaveProperty("bookedVenue");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Should get operational hours Failed venue not found", (done) => {
    request(app)
      .get("/api/venue/operational/3")
      .then(({ body }) => {
        expect(body.message).toEqual("Venue Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
