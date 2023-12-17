const CryptoJS = require("crypto-js");

const encryptMessageBody = (message) => {
  const cipher = CryptoJS.AES.encrypt(message, process.env.TOKEN_MESSAGE_CRYPTO);
  return cipher.toString();
};

const dcryptMessageBody = (encryptedMessage) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, process.env.TOKEN_MESSAGE_CRYPTO);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptMessageBody, dcryptMessageBody };
