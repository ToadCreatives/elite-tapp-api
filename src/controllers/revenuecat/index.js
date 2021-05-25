const httpStatus = require('http-status');
const logger = require('../../log');
const Subscription = require('../../models/subscription.model');
const User = require('../../models/user.model');
const sequelize = require('../../services/sequelize');

async function getUser(t, userId) {
  if (!userId) {
    throw new Error('User id not found');
  }

  const user = await User.findByPk(userId, { attributes: { exclude: ['password'] }, transaction: t });
  if (!user) {
    throw new Error(`User:${userId} not found`);
  }
  if (!user.verified) {
    throw new Error(`User:${userId} not verified`);
  }

  return user;
}

async function createOrGetSubscription(t, userId) {
  const sub = await Subscription.findOne({ where: { userId }, transaction: t });
  if (sub) {
    return sub;
  }

  return Subscription.build({ userId });
}

async function handleTrialStarted(productId, userId) {
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, user.id);
  });
}

async function handleEvent(event) {

}

exports.webhook = async (req, res, next) => {
  try {
    const { event } = req.body;
    return res.status(200).end();
  } catch (err) {
    logger.error(`subscription error: ${err}`, { type: 'revenuecat', error: err.stack || {} });
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  }
};
