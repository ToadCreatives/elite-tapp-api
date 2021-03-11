const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const User = require('../../models/user.model');

/**
 * is this `type` doesnt have `payload` already
 *
 * @param {('email'| 'username'| 'phone')} type - type to check
 * @param {string} payload - payload
 * @returns
 */
async function isTypeAvailable(type, payload) {
  const whereClause = {};
  whereClause[type] = payload;

  const existingUser = await User.findOne({
    where: whereClause,
    attributes: ['id'],
  });

  return !existingUser;
}

const validTypes = ['email', 'phone', 'username'];

exports.isAvailable = async (req, res, next) => {
  try {
    const { type, value } = req.body;

    if (!validTypes.includes(type)) {
      throw new APIError('Invalid Operation', httpStatus.BAD_REQUEST, errorCodes.InvalidOperation);
    }

    const available = await isTypeAvailable(type, value);

    return res.status(httpStatus.OK).json({ available });
  } catch (err) {
    next(err);
  }
};
