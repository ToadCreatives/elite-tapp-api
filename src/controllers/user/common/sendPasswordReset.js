const { customAlphabet } = require('nanoid/async');

const { v4: uuidv4 } = require('uuid');
const { addHours } = require('date-fns');
const APIError = require('../../../errors/APIError');
// eslint-disable-next-line no-unused-vars
const User = require('../../../models/user.model');
const { sendPasswordResetMail } = require('../../../emails');
const { SMS } = require('../../../sms');
const { sendSMS } = require('../../../sms/sender');
const PasswordResetRequest = require('../../../models/passwordResetRequest.model');
const { OtpRequest, OTP_SCOPE_PASSWORD_RESET } = require('../../../otp');

const fourDigitRandomId = customAlphabet('1234567890', 4);

const TEN_MINUTES_IN_SEC = 10 * 60;

/**
 * Create password reset request
 *
 * @param {string} userId
 * @param {Date} expiresAt
 * @returns {Promise<string>}
 */
async function createPasswordResetRequest(userId, expiresAt) {
  await PasswordResetRequest.destroy({
    where: {
      userId,
    },
  });
  const token = uuidv4();
  await PasswordResetRequest.create({
    userId,
    token,
    expiresAt,
  });

  return token;
}

/**
 * send with code
 *
 * @param {User} userDAO
 * @returns
 */
async function sendEmailWithCode(userDAO) {
  const userId = userDAO.id;

  const verificationId = await createPasswordResetRequest(userId, addHours(new Date(), 2));
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
    OTP_SCOPE_PASSWORD_RESET,
    userId,
    requestId,
    otpCode,
    TEN_MINUTES_IN_SEC,
  );
  await otpRequest.saveAndCreateSession();

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
  createPasswordResetRequest,
};
