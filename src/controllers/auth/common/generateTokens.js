const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../../config');

function generateAccessToken(user) {
  const expAt = moment().add(config.token.expiration, config.token.expirationUnit);
  const payload = {
    exp: expAt.unix(),
    iat: moment().unix(),
    sub: user._id,
  };

  return { token: jwt.sign(payload, config.secret), expires: expAt.utc(), tokenType: 'Bearer' };
}

async function generateTokenResponse(user, refreshToken) {
  const accessToken = generateAccessToken(user);

  return {
    message: 'OK',
    accessToken,
    refreshToken,
    user: user.getUserInfo(),
  };
}

module.exports = {
  generateAccessToken,
  generateTokenResponse,
};
