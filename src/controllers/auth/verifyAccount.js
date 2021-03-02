const { isAfter } = require('date-fns');
const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const User = require('../../models/user.model');
const UserVerification = require('../../models/userVerification.model');

exports.verifyAccount = async (req, res, next) => {
  try {
    const { verificationId, otpCode = null } = req.body;

    const verification = await UserVerification.findOne({
      where: {
        verificationId,
      },
    });

    if (!verification || (verification && isAfter(new Date(), verification.expiresAt))) {
      throw new APIError('Verification expired', httpStatus.UNAUTHORIZED, errorCodes.VerificationExpired);
    }

    // dont allow empty otp code to activate account
    if (verification.method === 'phone') {
      if (!otpCode) {
        throw new APIError(
          'OTP code is required for mobile activation',
          httpStatus.UNAUTHORIZED,
          errorCodes.OTPCodeRequired,
        );
      }

      if (verification.otpCode !== otpCode) {
        throw new APIError(
          'Invalid OTP code',
          httpStatus.UNAUTHORIZED,
          errorCodes.OTPCodeRequired,
        );
      }
    }

    // activate account
    await User.update({ verified: true }, {
      where: {
        id: verification.userId,
      },
    });
    await verification.destroy();

    return res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
};
