const Joi = require('joi');

module.exports = {
  addInterests: {
    body: Joi.object({
      interests: Joi.array().items(Joi.string().uuid()).unique().required(),
    }),
  },
};
