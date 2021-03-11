const { register } = require('./register');
const { resendActicationCode } = require('./resendActivationCode');
const { sendPasswordReset } = require('./sendPasswordReset');
const { resetPassword } = require('./resetPassword');
const {
  isAvailable,
} = require('./checkAvailability');

module.exports = {
  register,
  resendActicationCode,
  sendPasswordReset,
  resetPassword,
  isAvailable,
};
