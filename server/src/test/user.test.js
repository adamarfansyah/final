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

let token;

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
});

describe("Get Profile User", () => {
  test("should have data for response", (done) => {
    request(app)
      .get("/api/user/profile")
      .set("authorization", `Bearer ${token}`)
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        expect(body.data).toHaveProperty("username");
        expect(body.data).toHaveProperty("email");
        expect(body.data).toHaveProperty("firstName");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("should have return User Not Found with false token", (done) => {
    request(app)
      .get("/api/user/profile")
      .set("authorization", `Bearer 123idoa9w19323123sdw`)
      .then(({ body }) => {
        expect(body.message).toEqual("jwt malformed");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("Update Profile User", () => {
  test("Failure Update with false token", (done) => {
    request(app)
      .put("/api/user/update-profile")
      .set("authorization", `Bearer 123idoa9w19323123sdw`)
      .then(({ body }) => {
        expect(body.message).toEqual("jwt malformed");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("Update User Password", () => {
  test("Success Update Password", (done) => {
    request(app)
      .patch("/api/user/update-password")
      .set("authorization", `Bearer ${token}`)
      .send({
        oldPassword: dummyUser[0].password,
        password: dummyUser[0].password,
        confirmPassword: dummyUser[0].password,
      })
      .then(({ body }) => {
        expect(body.message).toEqual("Success Update Password User");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
