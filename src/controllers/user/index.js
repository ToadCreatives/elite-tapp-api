const { register } = require('./register');
const { resendActicationCode } = require('./resendActivationCode');
const { sendPasswordReset } = require('./sendPasswordReset');

module.exports = {
  register,
  resendActicationCode,
  sendPasswordReset,
};
