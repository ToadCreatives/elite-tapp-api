const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const logger = require('../../log');
const Subscription = require('../../models/subscription.model');
const User = require('../../models/user.model');
const sequelize = require('../../services/sequelize');
const { events, periodTypes } = require('../../utils/revenueCatConsts');

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

async function handleInitialPurchase(event) {
  const {
    product_id: plan,
    app_user_id: userId,
    period_type: periodType,
    expiration_at_ms: expirationAtMs,
  } = event;
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, userId);
    const isTrial = periodType === periodTypes.TRIAL;
    await sub.update({
      isTrial,
      isActive: true,
      expiresAt: new Date(expirationAtMs),
      plan,
      userId: user.id,
    }, { transaction: t });

    logger.info(
      `user:${userId} purchased ${periodType} initially`,
      { type: 'revenuecat', event: events.INITIAL_PURCHASE },
    );
  });
}

async function handleRenewal(event) {
  const {
    product_id: plan,
    app_user_id: userId,
    expiration_at_ms: expirationAtMs,
    is_trial_conversion: isTrialConversion,
  } = event;
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, userId);

    await sub.update({
      isTrial: isTrialConversion,
      isActive: true,
      expiresAt: new Date(expirationAtMs),
      plan,
      userId: user.id,
    }, { transaction: t });

    logger.info(
      `user:${userId} renewed ${plan} valid till ${new Date(expirationAtMs)}`,
      { type: 'revenuecat', event: events.RENEWAL },
    );
  });
}

async function handleProductChange(event) {
  const {
    product_id: productId,
    new_product_id: plan,
    app_user_id: userId,
    expiration_at_ms: expirationAtMs,
  } = event;
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, userId);

    await sub.update({
      isTrial: false,
      isActive: true,
      expiresAt: new Date(expirationAtMs),
      plan,
      userId: user.id,
    }, { transaction: t });

    logger.info(
      `user:${userId} changed from ${productId} to ${plan}`,
      { type: 'revenuecat', event: events.PRODUCT_CHANGE },
    );
  });
}

async function handleBillingIssue(event) {
  const {
    new_product_id: plan,
    app_user_id: userId,
    expiration_at_ms: expirationAtMs,
    grace_period_expiration_at_ms: gracePeriodExpirationAtMs,
  } = event;
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, userId);

    await sub.update({
      isTrial: false,
      isActive: true,
      expiresAt: new Date(gracePeriodExpirationAtMs || expirationAtMs),
      plan,
      userId: user.id,
    }, { transaction: t });

    logger.info(
      `user:${userId} occured a billing issue. Waiting on grace period ${new Date(gracePeriodExpirationAtMs || expirationAtMs)}`,
      { type: 'revenuecat', event: events.BILLING_ISSUE },
    );
  });
}

async function handleCancellation(event) {
  const {
    product_id: plan,
    app_user_id: userId,
    expiration_at_ms: expirationAtMs,
    cancel_reason: cancelReason,
  } = event;
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, userId);

    await sub.update({
      isTrial: false,
      isActive: false,
      expiresAt: new Date(expirationAtMs),
      plan,
      userId: user.id,
    }, { transaction: t });

    logger.info(`user:${userId} cancelled subscription due to ${cancelReason}`, { type: 'revenuecat', event: events.CANCELLATION });
  });
}

async function handleUncancellation(event) {
  const {
    product_id: plan,
    app_user_id: userId,
    expiration_at_ms: expirationAtMs,
  } = event;
  await sequelize.transaction(async (t) => {
    const user = await getUser(t, userId);
    const sub = await createOrGetSubscription(t, userId);

    await sub.update({
      isTrial: false,
      isActive: true,
      expiresAt: new Date(expirationAtMs),
      plan,
      userId: user.id,
    }, { transaction: t });

    logger.info(`user:${userId} uncancelling subscription`, { type: 'revenuecat', event: events.UNCANCELLATION });
  });
}

// eslint-disable-next-line no-unused-vars
exports.webhook = async (req, res, _next) => {
  try {
    const { event = null } = req.body;

    if (!event) {
      throw new APIError('Unkown format');
    }

    const { type: eventType } = event;

    switch (eventType) {
      case events.INITIAL_PURCHASE:
        await handleInitialPurchase(event);
        break;

      case events.RENEWAL:
        await handleRenewal(event);
        break;

      case events.PRODUCT_CHANGE:
        await handleProductChange(event);
        break;

      case events.BILLING_ISSUE:
        await handleBillingIssue(event);
        break;

      case events.CANCELLATION:
        await handleCancellation(event);
        break;

      case events.UNCANCELLATION:
        await handleUncancellation(event);
        break;

      default:
        logger.info(`ignoring event ${eventType}`, { type: 'revenuecat', event: eventType });
        break;
    }

    return res.status(200).end();
  } catch (err) {
    logger.error(`subscription error: ${err}`, { type: 'revenuecat', error: err.stack || {} });
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  }
};
