const httpStatus = require('http-status');
const User = require('../../models/user.model');

/**
 * is this `type` doesnt have `payload` already
 *
 * @param {('email'| 'username'| 'phone')} type - type to check
 * @param {string} payload - payload
 * @returns
 */
async function isAvailable(type, payload) {
  const whereClause = {};
  whereClause[type] = payload;

  const existingUser = await User.findOne({
    where: whereClause,
    attributes: ['id'],
  });

  return !existingUser;
}

exports.isEmailAvailable = async (req, res, next) => {
  try {
    const { value } = req.query;

    const available = await isAvailable('email', value);

    return res.status(httpStatus.OK).json({ available });
  } catch (err) {
    next(err);
  }
};

exports.isUsernameAvailable = async (req, res, next) => {
  try {
    const { value } = req.query;

    const available = await isAvailable('username', value);

    return res.status(httpStatus.OK).json({ available });
  } catch (err) {
    next(err);
  }
};

exports.isPhoneAvailable = async (req, res, next) => {
  try {
    const { value } = req.query;

    const available = await isAvailable('phone', value);

    return res.status(httpStatus.OK).json({ available });
  } catch (err) {
    next(err);
  }
};
