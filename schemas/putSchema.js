const Joi = require("joi");

const putSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
}).required();

module.exports = { putSchema };
