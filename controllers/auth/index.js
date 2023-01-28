const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const getCurrent = require("./getCurrent");
const getLogout = require("./getLogout");
const { updateAvatar } = require("./updateAvatar");
const { verifyMail } = require("./verifyMail");
const { resendVerify} = require("./resendVerify");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  getLogout,
  updateAvatar,
  verifyMail,
  resendVerify,
};
