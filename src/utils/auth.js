const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.model');

function verifyJwt(token, secret) {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => (err ? resolve(null) : resolve(decoded)));
  });
}

/**
 *
 *
 * @param {Express.Request} req
 */
async function getUserFromReq(req) {
  try {
    if (!req.header('Authorization')) {
      return null;
    }

    const authHeader = req.header('Authorization').split(' ');
    if (authHeader.length !== 2) {
      return null;
    }

    const token = authHeader[1];

    const decoded = await verifyJwt(token, config.secret);

    const userId = decoded.sub;
    const user = await User.findOne({
      where: {
        id: userId,
        verified: true,
      },
      attributes: ['id', 'username'],
    });

    return user;
  } catch (error) {
    return null;
  }
}

exports.getUserFromReq = getUserFromReq;
