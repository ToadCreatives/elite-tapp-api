const { customAlphabet } = require('nanoid/async');

const { v4: uuidv4 } = require('uuid');
const { addDays } = require('date-fns');
const APIError = require('../../../errors/APIError');
// eslint-disable-next-line no-unused-vars
const User = require('../../../models/user.model');
const { sendPasswordResetMail } = require('../../../emails');
const { SMS } = require('../../../sms');
const { sendSMS } = require('../../../sms/sender');
const PasswordResetRequest = require('../../../models/passwordResetRequest.model');
const { OtpRequest, OTP_SCOPE_PASSWORD_RESET, OtpSession } = require('../../../otp');

const fourDigitRandomId = customAlphabet('1234567890', 4);

const TEN_MINUTES_IN_SEC = 10 * 60;

/**
 * send with code
 *
 * @param {User} userDAO
 * @returns
 */
async function sendEmailWithCode(userDAO) {
  const userId = userDAO.id;
  // clear old verifications and resend email
  await PasswordResetRequest.destroy({
    where: {
      userId,
    },
  });

  const verificationId = uuidv4();
  await PasswordResetRequest.create({
    userId,
    method: 'email',
    verificationId,
    expiresAt: addDays(new Date(), 1),
  });

  await sendPasswordResetMail(userDAO, verificationId);

  return {
    method: 'email',
  };
}

/**
 * send with code
 *
 * @param {User} userDAO
 * @returns
 */
async function sendSMSCode(userDAO) {
  const { id: userId, phone } = userDAO;
  const prevOtp = await OtpRequest.GetRequest(phone, OTP_SCOPE_PASSWORD_RESET);

  if (prevOtp) {
    // we have already valid activation
    return {
      requestId: prevOtp.requestId,
      method: 'phone',
    };
  }

  const requestId = uuidv4();
  const otpCode = await fourDigitRandomId();

  const otpRequest = new OtpRequest(
    phone,
    userId,
    requestId,
    OTP_SCOPE_PASSWORD_RESET,
    TEN_MINUTES_IN_SEC,
  );
  await otpRequest.save();

  const otpSession = new OtpSession(
    requestId,
    OTP_SCOPE_PASSWORD_RESET,
    userId,
    otpCode,
    TEN_MINUTES_IN_SEC,
  );
  await otpSession.save();

  const sms = SMS.CreateOTPMessage(userDAO.phone, otpCode);
  await sendSMS(sms);

  return {
    requestId,
    method: 'phone',
  };
}

/**
 * send activation code
 *
 * @param {User} userDAO
 * @returns
 */
async function sendPasswordReset(userDAO) {
  if (userDAO.email) {
    return sendEmailWithCode(userDAO);
  }

  if (userDAO.phone) {
    return sendSMSCode(userDAO);
  }

  throw new APIError('Unknown provider');
}

module.exports = {
  sendPasswordReset,
};
