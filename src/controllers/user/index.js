const { register } = require('./register');
const { resendActicationCode } = require('./resendActivationCode');
const { sendPasswordReset } = require('./sendPasswordReset');
const { resetPassword } = require('./resetPassword');
const {
  isUsernameAvailable,
} = require('./isUsernameAvailable');
const { setUsername } = require('./setUsername');

module.exports = {
  register,
  resendActicationCode,
  sendPasswordReset,
  resetPassword,
  isUsernameAvailable,
  setUsername,
};
