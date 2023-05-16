const Joi = require('joi');
const { VisibilityLevels } = require('../utils/social');
const { providerNames } = require('../utils/userLinkHelper');

const visibilities = Object.keys(VisibilityLevels);

// User validation rules
module.exports = {
  createLink: {
    body: Joi.object({
      provider: Joi.string().valid(...providerNames).required(),
      path: Joi.string().max(255).required(),
      visibility: Joi.string().valid(...visibilities).optional(),
    }),
  },
  updateLink: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
    body: Joi.object({
      path: Joi.string().max(255).allow(null),
      visibility: Joi.string().valid(...visibilities),
    }),
  },
  deleteLink: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  },
  preview: {
    body: Joi.object({
      provider: Joi.string().valid(...providerNames).required(),
      path: Joi.string().max(255).allow(null),
    }),
  },
};
