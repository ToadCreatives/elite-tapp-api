const httpStatus = require('http-status');
const { isAfter } = require('date-fns');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const PasswordResetRequest = require('../../models/passwordResetRequest.model');

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const request = await PasswordResetRequest.findOne({
      where: {
        token,
      },
    });

    if (!request || (request && isAfter(new Date(), request.expiresAt))) {
      throw new APIError('Session Expired', httpStatus.UNAUTHORIZED, errorCodes.SessionExpired);
    }

    await request.destroy();
    const user = await request.getUser();
    user.password = password;
    await user.save();

    return res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
};
