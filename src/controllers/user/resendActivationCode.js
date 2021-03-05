const httpStatus = require('http-status');
const Sequelize = require('sequelize');
const User = require('../../models/user.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const { sendActivationCode } = require('./common/sendActivationCode');

const { Op } = Sequelize;

exports.resendActicationCode = async (req, res, next) => {
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

    if (user.verified) {
      throw new APIError('Account already verified', httpStatus.UNPROCESSABLE_ENTITY, errorCodes.AccountAlreadyVerified);
    }

    // resend activation
    await sendActivationCode(user);

    return res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
};
