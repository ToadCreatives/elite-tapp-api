const { addMinutes } = require('date-fns');
const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const { OTP_SCOPE_PASSWORD_RESET, OtpSession, OtpRequest } = require('../../otp');
const { createPasswordResetRequest } = require('../user/common/sendPasswordReset');

async function otpAction(scope, userId) {
  let sessionToken;
  switch (scope) {
    case OTP_SCOPE_PASSWORD_RESET:
      sessionToken = await createPasswordResetRequest(userId, addMinutes(new Date(), 15));
      return sessionToken;

    default:
      throw new Error('Unkown otp scope');
  }
}

exports.verifyOtpRequest = async (req, res, next) => {
  try {
    const { requestId, otpCode } = req.body;

    const otpSession = await OtpSession.GetSession(requestId);

    if (!otpSession) {
      throw new APIError('Session expired', httpStatus.UNAUTHORIZED, errorCodes.SessionExpired);
    }

    // get scope and user
    const {
      scope, userId, phone,
    } = otpSession;

    if (otpCode !== otpSession.otpCode) {
      throw new APIError(
        'Invalid OTP code',
        httpStatus.UNAUTHORIZED,
        errorCodes.OTPCodeRequired,
      );
    }

    await OtpRequest.DestroyWithSession(phone, scope, requestId);

    const sessionToken = await otpAction(scope, userId);

    return res.status(httpStatus.OK).json({ sessionToken });
  } catch (err) {
    next(err);
  }
};
