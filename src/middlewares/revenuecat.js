const httpStatus = require('http-status');
const { revenueCat } = require('../config');

module.exports = () => async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(httpStatus.UNAUTHORIZED).end();
    }
    const [type, secret] = authHeader.split(' ');
    if (type !== 'Bearer' && !secret) {
      return res.status(httpStatus.UNAUTHORIZED).end();
    }

    if (revenueCat.secret !== secret) {
      return res.status(httpStatus.UNAUTHORIZED).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};
