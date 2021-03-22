const Joi = require('joi');

module.exports = {
  addByUsername: {
    body: Joi.object({
      username: Joi.string().required(),
    }),
  },
};
