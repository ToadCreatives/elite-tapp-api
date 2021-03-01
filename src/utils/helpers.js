const Joi = require('joi');

function isEmail(data) {
  const result = Joi.string().email({ minDomainAtoms: 2 }).validate(data);
  return result.error === null;
}

function isPhone(data) {
  const result = Joi.string().regex(/^\+[1-9]\d{5,14}$/).validate(data);
  return result.error === null;
}

module.exports = {
  isEmail,
  isPhone,
};
