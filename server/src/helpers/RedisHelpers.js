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

const getDataFromCache = async (key) => {
  const cachedMerchants = await RedisClient.get(key);
  return JSON.parse(cachedMerchants);
};

const setDataInCache = async (key, data) => {
  await RedisClient.set(key, JSON.stringify(data));
};

const delDataInCache = async (key) => {
  await RedisClient.del(key);
};

const incrDataInCache = async (key) => {
  await RedisClient.incr(key);
};

const expDataInCache = async (key, time) => {
  await RedisClient.expire(key, time);
};

module.exports = {
  getDataFromCache,
  setDataInCache,
  delDataInCache,
  incrDataInCache,
  expDataInCache,
};
