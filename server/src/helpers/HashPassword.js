const bcrypt = require("bcrypt");

const PasswordHashing = async (password) => {
  const result = await bcrypt.hash(password, 10);

  return result;
};

const PasswordCompare = async (password, passwordHash) => {
  const matched = await bcrypt.compare(password, passwordHash);

  return matched;
};

module.exports = { PasswordHashing, PasswordCompare };
