const Joi = require('joi');

module.exports = {
  feed: {
    query: Joi.object({
      limit: Joi.number().integer().min(1).max(25),
      interests: Joi.alternatives().try(
        Joi.string().uuid(),
        Joi.array().items(Joi.string().uuid()).unique(),
      ),
    }),
  },
};
