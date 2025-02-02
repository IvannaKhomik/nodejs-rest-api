const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.required(),
  favorite: Joi.boolean(),
});

module.exports = {
  addSchema,
};
