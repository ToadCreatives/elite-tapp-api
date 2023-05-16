const Joi = require('joi');

// User validation rules
module.exports = {
  login: {
    body: Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  loginToken: {
    body: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  },
  verifyUser: {
    body: Joi.object({
      token: Joi.string().required(),
      otpCode: Joi.string().length(4).optional().allow(null),
    }),
  },
  verifyOtp: {
    body: Joi.object({
      requestId: Joi.string().required(),
      otpCode: Joi.string().length(4).required(),
    }),
  },
};
