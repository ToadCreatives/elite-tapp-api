const Joi = require('joi');
const { providerNames } = require('../utils/userLinkHelper');

// User validation rules
module.exports = {
  createLink: {
    body: Joi.object({
      provider: Joi.string().valid(...providerNames).required(),
      path: Joi.string().max(255).required(),
    }),
  },
  updateLink: {
    params: Joi.object({
      linkId: Joi.string().uuid().required(),
    }),
    body: Joi.object({
      path: Joi.string().max(255).allow(null).required(),
    }),
  },
  deleteLink: {
    params: Joi.object({
      linkId: Joi.string().uuid().required(),
    }),
  },
};
