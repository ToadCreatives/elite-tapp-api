const { v4: uuidv4 } = require('uuid');
const { addDays, isBefore, addMinutes } = require('date-fns');
const UserActivation = require('../../../models/userActivation.model');
const APIError = require('../../../errors/APIError');

async function sendEmailWithCode(userDAO) {
  const userId = userDAO._id;
  // clear old verifications and resend email
  await UserActivation.remove({
    user: userId,
  });

  const activation = new UserActivation({
    user: userId,
    method: 'email',
    activationId: uuidv4(),
    expiresAt: addDays(new Date(), 1),
  });
  await activation.save();

  // TODO: sendmail
  return {
    method: 'email',
  };
}

async function sendSMSCode(userDAO) {
  const userId = userDAO._id;
  const prevActivation = await UserActivation.findOne({
    user: userId,
  });

  if (prevActivation && isBefore(prevActivation.expiresAt, new Date())) {
    // we have already valid activation
    return {
      activationId: prevActivation.activationId,
    };
  }

  // we dont have any
  await UserActivation.remove({
    user: userId,
  });

  const activationId = uuidv4();
  const activation = new UserActivation({
    user: userId,
    method: 'phone',
    activationId,
    expiresAt: addMinutes(new Date(), 10),
  });
  await activation.save();

  // TODO: send sms

  return {
    activationId,
    method: 'phone',
  };
}

async function sendActivationCode(userDAO) {
  if (userDAO.email) {
    return sendEmailWithCode(userDAO);
  } if (userDAO.phone) {
    return sendSMSCode(userDAO);
  }

  throw new APIError('Unknown provider');
}

module.exports = {
  sendActivationCode,
};
