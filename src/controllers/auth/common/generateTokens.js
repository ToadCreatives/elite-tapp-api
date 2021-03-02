const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../../config');
// eslint-disable-next-line no-unused-vars
const User = require('../../../models/user.model');

/**
 * Generate access token
 *
 * @param {User} user
 * @returns
 */
function generateAccessToken(user) {
  const expAt = moment().add(config.token.expiration, config.token.expirationUnit);
  const payload = {
    exp: expAt.unix(),
    iat: moment().unix(),
    sub: user._id,
  };

  return { token: jwt.sign(payload, config.secret), expires: expAt.utc(), tokenType: 'Bearer' };
}

/**
 * Generate token response
 *
 * @param {User} user
 * @param {string} refreshToken
 * @returns
 */
function generateTokenResponse(user, refreshToken) {
  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    refreshToken,
    user: user.getUserInfo(),
  };
}

module.exports = {
  generateAccessToken,
  generateTokenResponse,
};
