const { customAlphabet } = require('nanoid/async');

const { v4: uuidv4 } = require('uuid');
const { addDays, isBefore, addMinutes } = require('date-fns');
const UserVerification = require('../../../models/userVerification.model');
const APIError = require('../../../errors/APIError');
// eslint-disable-next-line no-unused-vars
const User = require('../../../models/user.model');
const { sendUserVerificationMail } = require('../../../emails');

const nanoid = customAlphabet('1234567890', 6);

/**
 * send with code
 *
 * @param {User} userDAO
 * @returns
 */
async function sendEmailWithCode(userDAO) {
  const userId = userDAO.id;
  // clear old verifications and resend email
  await UserVerification.destroy({
    where: {
      userId,
    },
  });

  const verificationId = uuidv4();
  await UserVerification.create({
    userId,
    method: 'email',
    verificationId,
    expiresAt: addDays(new Date(), 1),
  });

  // TODO: sendmail

  await sendUserVerificationMail(userDAO, verificationId);

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
  const userId = userDAO.id;
  const prevActivation = await UserVerification.findOne({
    where: {
      userId,
    },
  });

  if (prevActivation && isBefore(prevActivation.expiresAt, new Date())) {
    // we have already valid activation
    return {
      activationId: prevActivation.activationId,
    };
  }

  // we dont have any
  await UserVerification.destroy({
    where: {
      userId,
    },
  });

  const verificationId = uuidv4();
  const otpCode = await nanoid();
  await UserVerification.create({
    userId,
    method: 'phone',
    otpCode,
    verificationId,
    expiresAt: addMinutes(new Date(), 15),
  });

  // TODO: send sms

  return {
    verificationId,
    method: 'phone',
  };
}

/**
 * send activation code
 *
 * @param {User} userDAO
 * @returns
 */
async function sendActivationCode(userDAO) {
  if (userDAO.email) {
    return sendEmailWithCode(userDAO);
  }

  if (userDAO.phone) {
    return sendSMSCode(userDAO);
  }

  throw new APIError('Unknown provider');
}

module.exports = {
  sendActivationCode,
};
