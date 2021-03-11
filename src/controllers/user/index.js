const { register } = require('./register');
const { resendActicationCode } = require('./resendActivationCode');
const { sendPasswordReset } = require('./sendPasswordReset');
const { resetPassword } = require('./resetPassword');
const {
  isEmailAvailable,
  isPhoneAvailable,
  isUsernameAvailable,
} = require('./checkAvailability');

module.exports = {
  register,
  resendActicationCode,
  sendPasswordReset,
  resetPassword,
  isEmailAvailable,
  isPhoneAvailable,
  isUsernameAvailable,
};
