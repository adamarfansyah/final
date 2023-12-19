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

// const image = path.join(__dirname, "..", "..", "assets", "bg-homepage.jpg");
// const image = `${__dirname}/../../assets/bg-homepage.jpg`;
// const image = path.join(__dirname, "../../assets/bg-homepage.jpg");

// const dummyUser = [
//   {
//     email: "adamsake8@gmail.com",
//     // password: await PasswordHashing("adam123"),
//     // confirmPassword: await PasswordHashing("adam123"),
//     firstName: "Adam Sake",
//     lastName: "Arfansyah",
//     phoneNumber: "0812329398932",
//     image: image,
//   },
//   {
//     email: "adamsake13@gmail.com",
//     // password: await PasswordHashing("adam123"),
//     // confirmPassword: await PasswordHashing("adam123"),
//     firstName: "Adam Sake A",
//     lastName: "Arfansyahh",
//     phoneNumber: "0812329398032",
//     image: image,
//   },
// ];

const tokenMock = "1209310kdowkpdow12323";
let token;
let tokenUpdatePassword;

let testUser;

// beforeAll((done) => {
//   const dummy = {
//     username: "@adamarfansyahhh",
//     email: "adamsake13@gmail.com",
//     password: encryptMessageBody("adam123"),
//     confirmPassword: encryptMessageBody("adam123"),
//     firstName: "adam sake",
//     lastName: "arfansayahhhh",
//     phoneNumber: "123209409342",
//     image: image,
//   };
//   request(app)
//     .post("/api/auth/register")
//     // , { contentType: "multipart/form-data" }
//     // .set("content-type", "multipart/form-data")
//     .field("Content-Type", "multipart/form-data")
//     .field("username", dummy.username)
//     .field("email", dummy.email)
//     .field("password", dummy.password)
//     .field("confirmPassword", dummy.confirmPassword)
//     .field("firstName", dummy.firstName)
//     .field("lastName", dummy.lastName)
//     .field("phoneNumber", dummy.phoneNumber)
//     // .attach("image", image)
//     .attach("jpg", image, { contentType: "application/x-pkcs12", filename: "bg-homepage.jpg" })
//     .then(({ body }) => {
//       console.log({ body, image }, "<<<<<<");
//       done();
//     })
//     .catch((err) => {
//       console.log(err, "<<<<<<<<<<< ERROR");
//       done(err);
//     });
// });

// describe("test", () => {
//   test("should ", () => {
//     console.log({ testUser });
//   });
// });

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

  test("Compared Password with status Password is not same", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: dummyUser[0].email, password: encryptMessageBody("test123") })
      .then(({ body }) => {
        expect(body.status).toEqual("Password is not same");
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
