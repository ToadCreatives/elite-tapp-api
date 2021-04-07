const httpStatus = require('http-status');
const { Op } = require('sequelize');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const User = require('../../models/user.model');
const UserLink = require('../../models/userLink.model');
const UserProfile = require('../../models/userProfile.model');
const { getUserFromReq } = require('../../utils/auth');
const { getConnectionVisibilityLevel, VisibilityLevels } = require('../../utils/social');
const { getAvatarUrl } = require('../../utils/url');

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

  const linksDao = await UserLink.findAll({
    where: {
      userId,
      visibility: {
        [Op.gte]: visibilityLevel,
      },
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
