const { register } = require('./register');
const { resendActicationCode } = require('./resendActivationCode');
const { sendPasswordReset } = require('./sendPasswordReset');
const { resetPassword } = require('./resetPassword');

module.exports = {
  register,
  resendActicationCode,
  sendPasswordReset,
  resetPassword,
};
