const Joi = require('joi');
const { NameRegex } = require('../utils/helpers');

// User validation rules
module.exports = {
  updateProfile: {
    body: Joi.object({
      firstName: Joi.string().regex(NameRegex).max(255).allow(null),
      lastName: Joi.string().regex(NameRegex).max(255).allow(null),
      dateOfBirth: Joi.date().less('now'),
      bio: Joi.string().max(512).allow(null),
      gender: Joi.string().valid('male', 'female').allow(null),
    }),
  },
};
