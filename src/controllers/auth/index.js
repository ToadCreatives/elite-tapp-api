const {
  login,
  loginRefreshToken,
} = require('./login');
const { verifyAccount } = require('./verifyAccount');
const { verifyOtpRequest } = require('./verifyOtpRequest');

module.exports = {
  login,
  loginRefreshToken,
  verifyAccount,
  verifyOtpRequest,
};
