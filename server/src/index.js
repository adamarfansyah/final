const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Routes = require("../src/routes/index");
const cookieParser = require("cookie-parser");
const { createClient } = require("redis");
const { encryptMessageBody, dcryptMessageBody } = require("./helpers/Encrypt");
const { Messages, RoomChats } = require("../src/database/models");

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

io.on("connection", async (socket) => {
  console.log("Socket id is" + socket.id + " Connected");
  const { roomId } = socket.handshake.query;
  try {
    const roomChat = await RoomChats.findOne({ where: { id: roomId } });

    if (!roomChat) {
      console.error("RoomChat not found for roomId:", roomId);
      socket.emit("roomChatNotFound", { roomId });
      return;
    }

    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
      try {
        const encryptedMessage = encryptMessageBody(data.body);
        const dcryptedMessage = dcryptMessageBody(encryptedMessage);

        await Messages.create({
          roomChatId: roomChat.id,
          senderId: data.senderId,
          body: encryptedMessage,
        });

        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, {
          senderId: data.senderId,
          body: dcryptedMessage,
        });
      } catch (error) {
        console.error("Error saving message to the database:", error);
      }
    });

    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  } catch (error) {
    socket.emit("roomChatError", { error: "Error finding RoomChat" });
  }
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("OWKODKOKW");
  return res.send("API is running ...");
});

app.use("/api", Routes);

app.all("*", (req, res) => {
  return res.status(404).json({ message: "URL Not Found", status: 404 });
});

server.listen(process.env.APP_PORT, () => {
  console.log(`App listen on port ${process.env.APP_PORT}`);
});
