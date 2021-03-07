const httpStatus = require('http-status');
const Sequelize = require('sequelize');
const User = require('../../models/user.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const { sendPasswordReset } = require('./common/sendPasswordReset');

const { Op } = Sequelize;

exports.sendPasswordReset = async (req, res, next) => {
  try {
    const { login } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: login },
          { phone: login },
        ],
      },
      attributes: ['id', 'email', 'phone', 'verified'],
    });

    if (!user) {
      throw new APIError('User account not found', httpStatus.NOT_FOUND, errorCodes.InvalidCredentials);
    }

    if (!user.verified) {
      throw new APIError('Account not verified', httpStatus.UNPROCESSABLE_ENTITY, errorCodes.AccountNotVerified);
    }

    // resend activation
    const result = await sendPasswordReset(user);

    return res.status(httpStatus.OK).json({ message: 'OK', ...result });
  } catch (err) {
    next(err);
  }
};
