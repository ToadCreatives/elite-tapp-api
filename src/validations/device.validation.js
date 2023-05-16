const Joi = require('joi');

// User validation rules
module.exports = {
  updateDevice: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255).allow(null),
      active: Joi.boolean(),
    }),
  },
  deleteDevice: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  },
  registerNewDevice: {
    body: Joi.object({
      name: Joi.string().max(255).allow(null).optional(),
      deviceUid: Joi.string().max(255).required(),
    }),
  },
  getUser: {
    params: Joi.object({
      deviceUid: Joi.string().required(),
    }),
  },
};
