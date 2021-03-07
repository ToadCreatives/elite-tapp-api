const Joi = require('joi');
const { JOI_PHONE_SCHEMA, JOI_EMAIL_SCHEMA } = require('../utils/helpers');

// User validation rules
module.exports = {
  login: {
    body: Joi.object({
      login: Joi.alternatives().try(
        JOI_EMAIL_SCHEMA,
        JOI_PHONE_SCHEMA,
      ).required(),
      password: Joi.string().min(6).max(128).required(),
    }),
  },
  loginToken: {
    body: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  },
  verifyUser: {
    body: Joi.object({
      verificationId: Joi.string().required(),
      otpCode: Joi.string().length(4).optional().allow(null),
    }),
  },
};
