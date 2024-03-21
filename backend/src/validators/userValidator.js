// validators/userValidator.js
const Joi = require('joi');

exports.validateUserRegistration = (userData) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required()
  });

  return schema.validate(userData);
};
