const Joi = require('joi');
const { JOI_PHONE_SCHEMA, JOI_EMAIL_SCHEMA, UsernameRegex } = require('../utils/helpers');

// User validation rules
module.exports = {
  register: {
    body: Joi.object({
      login: Joi.alternatives().try(
        JOI_EMAIL_SCHEMA,
        JOI_PHONE_SCHEMA,
      ).required(),
      password: Joi.string().min(6).max(128).required(),
    }),
  },
  changePassword: {
    body: Joi.object({
      currentPassword: Joi.string().min(6).max(128).required(),
      newPassword: Joi.string().min(6).max(128).required(),
    }),
  },
  resendActivationCode: {
    body: Joi.object({
      login: Joi.alternatives().try(
        JOI_EMAIL_SCHEMA,
        JOI_PHONE_SCHEMA,
      ).required(),
    }),
  },
  sendPasswordReset: {
    body: Joi.object({
      login: Joi.alternatives().try(
        JOI_EMAIL_SCHEMA,
        JOI_PHONE_SCHEMA,
      ).required(),
    }),
  },
  resetPassword: {
    body: Joi.object({
      token: Joi.string().required(),
      password: Joi.string().min(6).max(128).required(),
    }),
  },
  isUsernameAvailable: {
    query: Joi.object({
      value: Joi.string().required(),
    }),
  },
  setUsername: {
    body: Joi.object({
      // TODO: add regex pattern
      username: Joi.string().regex(UsernameRegex).required(),
    }),
  },

};
