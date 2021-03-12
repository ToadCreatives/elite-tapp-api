const Joi = require('joi');

const PHONE_REGEX = /^\+[1-9]\d{5,14}$/;
const JOI_EMAIL_SCHEMA = Joi.string().email();
const JOI_PHONE_SCHEMA = Joi.string().regex(/^\+[1-9]\d{5,14}$/);

function isEmail(data) {
  const result = JOI_EMAIL_SCHEMA.validate(data);
  return !result.error;
}

function isPhone(data) {
  const result = JOI_PHONE_SCHEMA.validate(data);
  return !result.error;
}

const UsernameRegex = /^(?=.{5,25}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![.-])$/;
const NameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

module.exports = {
  isEmail,
  isPhone,
  PHONE_REGEX,
  JOI_EMAIL_SCHEMA,
  JOI_PHONE_SCHEMA,
  UsernameRegex,
  NameRegex,
};
