const Joi = require('joi');

module.exports = {
  addByUsername: {
    body: Joi.object({
      username: Joi.string().required(),
    }),
  },
  addByDevice: {
    body: Joi.object({
      deviceUid: Joi.string().required(),
    }),
  },
};
