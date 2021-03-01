const httpStatus = require('http-status');
const User = require('../../models/user.model');
const { isEmail, isPhone } = require('../../utils/helpers');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');

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

    return res.status(httpStatus.CREATED).json({
      message: 'Account created',
    });
  } catch (err) {
    return next(err);
  }
};
