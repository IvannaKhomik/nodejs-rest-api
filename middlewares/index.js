const validateBody = require("./validationMiddleware");
const authenticate = require("./authenticate");

module.exports = {
  validateBody,
  authenticate,
};
