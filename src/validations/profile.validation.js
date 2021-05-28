const Joi = require('joi');
const { NameRegex } = require('../utils/helpers');

const genders = ['male', 'female', 'non-binary', 'not-specified'];

// User validation rules
module.exports = {
  updateProfile: {
    body: Joi.object({
      firstName: Joi.string().regex(NameRegex).max(255).allow(null),
      lastName: Joi.string().regex(NameRegex).max(255).allow(null),
      dateOfBirth: Joi.date().less('now'),
      bio: Joi.string().max(512).allow(null),
      gender: Joi.string().valid(...genders).allow(null),
      avatar: Joi.string().allow(null),
    }),
  },
  uploadAvatar: {
    body: Joi.object({
      name: Joi.string().required(),
      contentType: Joi.string().required(),
      contentMd5: Joi.string().required(),
    }),
  },
};
