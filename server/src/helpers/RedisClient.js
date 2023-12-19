const Redis = require("ioredis");

const RedisClient = new Redis({
  host: "localhost",
  port: 6379,
});

RedisClient.on("connect", () => {
  console.log("Success Connet redis");
});

RedisClient.on("error", (err) => {
  console.log("Error Connect Redis", err);
});
