const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const getCurrent = require("./getCurrent");
const getLogout = require("./getLogout");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  getLogout,
  updateAvatar,
};
