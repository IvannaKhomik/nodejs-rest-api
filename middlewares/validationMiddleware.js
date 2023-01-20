const { HttpError } = require("../helpers");

const validateBody = (schema, message) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (message) {
        throw HttpError(400, message);
      }
      const err = new Error(error.message);
      throw HttpError(400, err);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
