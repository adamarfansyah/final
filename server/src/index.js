const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Routes = require("../src/routes/index");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("API is running ...");
});

app.use("/api", Routes);

app.all("*", (req, res) => {
  return res.status(404).json({ message: "URL Not Found", status: 404 });
});

if (!module.parent) {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App listen on port ${process.env.APP_PORT}`);
  });
}

module.exports = app;
