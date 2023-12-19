const RedisClient = require("./RedisClient");

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

module.exports = { getDataFromCache, setDataInCache, delDataInCache };
