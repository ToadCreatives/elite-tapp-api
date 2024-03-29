const { register } = require('./register');
const { resendActicationCode } = require('./resendActivationCode');
const { sendPasswordReset } = require('./sendPasswordReset');
const { resetPassword } = require('./resetPassword');
const {
  isUsernameAvailable,
} = require('./isUsernameAvailable');
const { setUsername } = require('./setUsername');
const { changePassword } = require('./changePassword');
const { deleteAccount } = require('./deleteAccount');

module.exports = {
  register,
  resendActicationCode,
  sendPasswordReset,
  resetPassword,
  isUsernameAvailable,
  setUsername,
  changePassword,
  deleteAccount,
};
