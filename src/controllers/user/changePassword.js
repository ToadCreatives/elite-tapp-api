const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');

exports.changePassword = async (req, res, next) => {
  try {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;

    if (!user.passwordMatches(currentPassword)) {
      throw new APIError(
        'Current password is invalid',
        httpStatus.BAD_REQUEST,
        errorCodes.InvalidCredentials,
      );
    }

    await user.update({
      password: newPassword,
    });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};
