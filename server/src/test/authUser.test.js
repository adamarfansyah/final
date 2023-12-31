const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../database/models/index");
const { queryInterface } = sequelize;
const path = require("path");
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

const tokenMock = "1209310kdowkpdow12323";
let token;
let tokenUpdatePassword;

describe("Auth User Login", () => {
  test("Success Login User with status Success", (done) => {
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

  test("Failed Login with status Email Not Found", (done) => {
    request(app)
      .post("/api/auth/login")
      .send(dummyUser[1])
      .then(({ body }) => {
        expect(body.status).toEqual("Email Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Validation Error with status Validation Error", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: dummyUser[0].email, password: "" })
      .then(({ body }) => {
        expect(body.status).toEqual("Validation Error");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Compared Password with status Password is not correct", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: dummyUser[0].email, password: encryptMessageBody("test123") })
      .then(({ body }) => {
        expect(body.status).toEqual("Password is not correct");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Auth Logout User", () => {
  test("Success Logout with status 204 Success ", (done) => {
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

  test("Failed Logout with message jwt malformed ", (done) => {
    request(app)
      .post("/api/auth/logout")
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

describe("Verify Email OTP User", () => {
  test("Success and return token and expired otp", (done) => {
    request(app)
      .post("/api/auth/verify-email")
      .send({ email: dummyUser[1].email })
      .then(({ body }) => {
        expect(body.message).toEqual("Success");
        expect(body.data).toHaveProperty("token");
        tokenVerify = body.data.token;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Failure with Email already used", (done) => {
    const email = "adamsake8@gmail.com";
    request(app)
      .post("/api/auth/verify-email")
      .send({ email })
      .then(({ body }) => {
        expect(body.status).toEqual("Email is already in use.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Forgot Password User", () => {
  test("Success get Token for forgot password", (done) => {
    request(app)
      .post("/api/auth/forgot-password")
      .send({ email: dummyUser[0].email })
      .then(({ body }) => {
        expect(body.message).toEqual("Success Forgot Password");
        expect(body.data).toHaveProperty("token");
        tokenUpdatePassword = body.data.token;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Forgot Password but user not found", (done) => {
    request(app)
      .post("/api/auth/forgot-password")
      .send({ email: dummyUser[1].email })
      .then(({ body }) => {
        expect(body.status).toEqual("User not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Forgot Password but Validation Error", (done) => {
    request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "adamsake123" })
      .then(({ body }) => {
        expect(body.status).toEqual("Validation Error");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Update password with forgot password", () => {
  test("Success Update password with response user updated", (done) => {
    request(app)
      .post(`/api/auth/update-forgot-password/${tokenUpdatePassword}`)
      .send({ password: dummyUser[0].password, confirmPassword: dummyUser[0].password })
      .then(({ body }) => {
        expect(body.message).toEqual("Success Update Password");
        expect(body.data).toHaveProperty("password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Failed Update password with token null or false", (done) => {
    request(app)
      .post(`/api/auth/update-forgot-password/${tokenMock}`)
      .send({ password: dummyUser[0].password, confirmPassword: dummyUser[0].password })
      .then(({ body }) => {
        expect(body.status).toEqual("User not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Failed with validation Error", (done) => {
    request(app)
      .post(`/api/auth/update-forgot-password/${tokenUpdatePassword}`)
      .send({ password: "", confirmPassword: "" })
      .then(({ body }) => {
        expect(body.status).toEqual("Validation Error");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
