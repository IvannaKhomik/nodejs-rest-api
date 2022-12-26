const Joi = require("joi");

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing required name field",
    });
  }
  next();
};

const putValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
  }).required();
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing fields",
    });
  }
  next();
};

module.exports = {
  postValidation,
  putValidation,
};
