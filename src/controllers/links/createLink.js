const httpStatus = require('http-status');
const moment = require('moment');
const APIError = require('../../errors/APIError');
const Subscription = require('../../models/subscription.model');
const UserLink = require('../../models/userLink.model');
const { Tiers } = require('../../utils/tiers');
const { getResourceUrl, providers } = require('../../utils/userLinkHelper');

async function validateSubscription(userId) {
  const sub = await Subscription.findOne({
    where: {
      userId,
    },
  });

  if (!sub) {
    throw new APIError('Upgrade to Elite Plus', httpStatus.UNPROCESSABLE_ENTITY);
  }

  if (!sub.isActive) {
    throw new APIError('Your subscription is inactive', httpStatus.UNPROCESSABLE_ENTITY);
  }

  if (moment().isAfter(sub.expiresAt)) {
    throw new APIError('Your subscription expired', httpStatus.UNPROCESSABLE_ENTITY);
  }
}

async function checkElighbility(userId, provider) {
  const selectedProvider = providers[provider];

  if (selectedProvider.tier === Tiers.plus) {
    await validateSubscription(userId);
  }
}

exports.createLink = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { provider, path, visibility = 'connections-only' } = req.body;

    await checkElighbility(userId, provider);

    const resourceUrl = getResourceUrl(provider, path);
    const result = await UserLink.create({
      provider,
      path,
      userId,
      visibility,
      tier: providers[provider].tier,
      resourceUrl,
    });

    return res.status(httpStatus.CREATED).json({
      userLink: {
        id: result.id,
        path,
        provider,
        resourceUrl,
        visibility,
        tier: providers[provider].tier,
        createdAt: result.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};
