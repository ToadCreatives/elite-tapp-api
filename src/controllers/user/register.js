const httpStatus = require('http-status');
const Sequelize = require('sequelize');
const User = require('../../models/user.model');
const { isEmail, isPhone } = require('../../utils/helpers');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const { sendActivationCode } = require('./common/sendActivationCode');

const { Op } = Sequelize;

exports.register = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const alreadyRegistered = await User.findOne({
      where: {
        [Op.or]: [
          { email: login },
          { phone: login },
        ],
      },
      attributes: ['id'],
    });

    if (alreadyRegistered) {
      throw new APIError(
        `Account exists for ${login}`,
        httpStatus.CONFLICT,
        errorCodes.AlreadyRegistered,
      );
    }

    const email = isEmail(login) ? login : undefined;
    const phone = isPhone(login) ? login : undefined;

    // register user
    const user = await User.create({ password, email, phone });

    // TODO send activation code
    const result = await sendActivationCode(user);

    return res.status(httpStatus.CREATED).json({
      message: 'Account created',
      ...result,
    });
  } catch (err) {
    return next(err);
  }
};
