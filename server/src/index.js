const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Routes = require("../src/routes/index");
const cookieParser = require("cookie-parser");
const { createClient } = require("redis");

const app = express();
const redisClient = createClient();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

dotenv.config();

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

(async () => {
  await redisClient.connect();
})();

redisClient.on("ready", () => {
  console.log("redis connected successfully!");
});

redisClient.on("error", (err) => {
  console.log("Error in the Connection", err);
});

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

server.listen(process.env.APP_PORT, () => {
  console.log(`App listen on port ${process.env.APP_PORT}`);
});
