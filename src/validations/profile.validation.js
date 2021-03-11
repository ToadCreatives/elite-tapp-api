const Joi = require('joi');

// User validation rules
module.exports = {
  updateProfile: {
    body: Joi.object({
      firstName: Joi.string().max(255).allow(null),
      lastName: Joi.string().max(255).allow(null),
      dateOfBirth: Joi.date().less('now'),
      bio: Joi.string().max(512).allow(null),
      genderId: Joi.string().uuid().allow(null),
    }),
  },
};
