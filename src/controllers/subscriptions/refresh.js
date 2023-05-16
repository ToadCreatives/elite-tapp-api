const axios = require('axios');
const { get } = require('lodash');
const httpStatus = require('http-status');

const rc = require('../../config').revenueCat;
const Subscription = require('../../models/subscription.model');
const { periodTypes } = require('../../utils/revenueCatConsts');
const sequelize = require('../../services/sequelize');
const logger = require('../../log');
const APIError = require('../../errors/APIError');
const { ELITE_PLUS_MONTHLY, ELITE_PLUS_YEARLY } = require('../../utils/products');

async function createOrGetSubscription(t, userId) {
  const sub = await Subscription.findOne({ where: { userId }, transaction: t });
  if (sub) {
    return sub;
  }

  return Subscription.build({ userId });
}

async function handleSubscription(userId, plan, data) {
  const {
    period_type: periodType,
    expires_date: expiresDate,
    grace_period_expires_date: gracePeriodExpiresDate,
  } = data;
  await sequelize.transaction(async (t) => {
    const sub = await createOrGetSubscription(t, userId);
    const isTrial = periodType === periodTypes.TRIAL;
    const expiresAt = new Date(gracePeriodExpiresDate || expiresDate);
    const isActive = expiresAt.getTime() >= Date.now();

    await sub.update({
      isTrial,
      isActive,
      expiresAt,
      plan,
      userId,
    }, { transaction: t });

    logger.info(
      `user:${userId} purchased ${periodType}`,
      { type: 'subscription', method: 'refresh' },
    );
  });
}

exports.refresh = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    const response = await axios.default.get(`https://api.revenuecat.com/v1/subscribers/${userId}`, {
      headers: {
        Authorization: `Bearer ${rc.apiKey}`,
      },
    });

    if (response.status !== httpStatus.OK) {
      throw new APIError('Unknown error occured');
    }

    const { data } = response;
    const subscriptions = get(data, 'subscriber.subscriptions', null);
    if (subscriptions) {
      if (subscriptions[ELITE_PLUS_MONTHLY]) {
        await handleSubscription(userId, ELITE_PLUS_MONTHLY, subscriptions.elite_plus_monthly);
      } else if (subscriptions[ELITE_PLUS_YEARLY]) {
        await handleSubscription(userId, ELITE_PLUS_YEARLY, subscriptions.elite_plus_yearly);
      }
    }

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
