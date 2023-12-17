import CryptoJS from 'crypto-js';
import config from '@config/index';

const encryptData = (message) => {
  const cipher = CryptoJS.AES.encrypt(message, config.token.tokenCrypto);
  return cipher.toString();
};

const dcryptData = (encryptedMessage) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, config.token.tokenCrypto);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptData, dcryptData };
