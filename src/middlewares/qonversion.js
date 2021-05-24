const httpStatus = require('http-status');
const { qonversion } = require('../config');

module.exports = () => async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(httpStatus.FORBIDDEN).end();
    }
    const [type, secret] = authHeader.split(' ');
    if (type !== 'Basic' && !secret) {
      return res.status(httpStatus.FORBIDDEN).end();
    }

    if (qonversion.secret !== secret) {
      return res.status(httpStatus.FORBIDDEN).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};
