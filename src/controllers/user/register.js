const httpStatus = require('http-status');
const User = require('../../models/User.model');
const { isEmail, isPhone } = require('../../utils/helpers');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const { sendActivationCode } = require('./common/sendActivationCode');

exports.register = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const alreadyRegistered = await User.exists({
      $or: [
        { email: login },
        { phone: login },
      ],
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
    const user = new User({ password, email, phone });
    await user.save();

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
