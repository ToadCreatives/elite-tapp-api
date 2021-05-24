const { qonversion } = require('../config');

module.exports = async (req, _res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw Error('Unauthorized');
    }
    const [type, secret] = authHeader.split(' ');
    if (type !== 'Bearer' && !secret) {
      throw Error('Unauthorized');
    }

    if (qonversion.secret !== secret) {

    }

    next();
  } catch (error) {
    next(error);
  }
};
