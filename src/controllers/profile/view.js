const httpStatus = require('http-status');
const { Op } = require('sequelize');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const Subscription = require('../../models/subscription.model');
const User = require('../../models/user.model');
const UserLink = require('../../models/userLink.model');
const UserProfile = require('../../models/userProfile.model');
const { getUserFromReq } = require('../../utils/auth');
const { getConnectionVisibilityLevel, VisibilityLevels } = require('../../utils/social');
const { Tiers } = require('../../utils/tiers');
const { getAvatarUrl } = require('../../utils/url');

async function hasValidSubscription(userId) {
  const sub = await Subscription.findOne({
    where: {
      userId,
      isActive: true,
      expiresAt: {
        [Op.gte]: new Date(),
      },
    },
  });

  if (sub) {
    return true;
  }

  return false;
}

async function getProfileView(user, targetUsername) {
  let visibilityLevel = VisibilityLevels.public;

  const targetUser = await User.findOne({
    where: {
      username: targetUsername,
      verified: true,
    },
    attributes: ['id', 'username'],
  });

  if (!targetUser) {
    throw new APIError('User not found', httpStatus.NOT_FOUND, errorCodes.UserNotFound);
  }

  const userId = targetUser.id;

  if (user) {
    visibilityLevel = await getConnectionVisibilityLevel(user.id, targetUser.id);
  }

  const profileDao = await UserProfile.findOne({
    where: {
      userId,
    },
    attributes: ['firstName', 'lastName', 'bio', 'avatar'],
  });

  let tier = {
    [Op.eq]: Tiers.free,
  };

  const hasSub = await hasValidSubscription(userId);
  if (hasSub) {
    tier = {
      [Op.in]: [Tiers.free, Tiers.plus],
    };
  }

  const linksDao = await UserLink.findAll({
    where: {
      userId,
      visibility: {
        [Op.gte]: visibilityLevel,
      },
      tier,
    },
    attributes: ['provider', 'resourceUrl', 'path'],
    order: [['createdAt', 'asc']],
  });

  const result = {
    profile: {
      username: targetUser.username,
      firstName: profileDao.firstName,
      lastName: profileDao.lastName,
      bio: profileDao.bio,
      avatar: getAvatarUrl(profileDao.avatar || null),
    },
    links: linksDao,
  };

  return result;
}

exports.view = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserFromReq(req);

    const profileView = await getProfileView(user, username);

    return res.status(200).send({ data: profileView });
  } catch (err) {
    next(err);
  }
};
