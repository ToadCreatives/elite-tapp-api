const { addMinutes } = require('date-fns');
const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const { OTP_SCOPE_PASSWORD_RESET, OtpSession, OtpRequest } = require('../../otp');
const { createPasswordResetRequest } = require('../user/common/sendPasswordReset');

async function otpAction(scope, userId) {
  let sessionId;
  switch (scope) {
    case OTP_SCOPE_PASSWORD_RESET:
      sessionId = await createPasswordResetRequest(userId, addMinutes(new Date(), 15));
      return sessionId;

    default:
      throw new Error('Unkown otp scope');
  }
}

exports.verifyOtpRequest = async (req, res, next) => {
  try {
    const { requestId, code } = req.body;

    const otpSession = await OtpSession.GetSession(requestId);

    if (!otpSession) {
      throw new APIError('OTP Session expired', httpStatus.UNAUTHORIZED, errorCodes.OTPSessionExpired);
    }

    // get scope and user
    const {
      otpCode, scope, userId, phone,
    } = otpSession;

    if (code !== otpCode) {
      throw new APIError(
        'Invalid OTP code',
        httpStatus.UNAUTHORIZED,
        errorCodes.OTPCodeRequired,
      );
    }

    await OtpRequest.DestroyWithSession(phone, scope, requestId);

    const sessionId = await otpAction(scope, userId);

    return res.status(httpStatus.OK).json({ sessionId });
  } catch (err) {
    next(err);
  }
};
