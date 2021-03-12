const httpStatus = require('http-status');
const { pick } = require('lodash');
const UserProfile = require('../../models/userProfile.model');

/**
 * Get or create profile for user
 *
 * @param {string} userId - user id
 * @returns
 */
async function getOrCreateUserProfile(userId) {
  let userProfile = await UserProfile.findOne({
    where: {
      userId,
    },
  });
  if (!userProfile) {
    userProfile = UserProfile.build({ userId });
  }

  return userProfile;
}

/**
 * Returns a safe object with safe to update params
 *
 * @param {object} original
 * @returns
 */
function getSafeProfileParams(original) {
  return pick(
    original,
    [
      'firstName',
      'lastName',
      'dateOfBirth',
      'bio',
      'gender',
    ],
  );
}

exports.updateProfile = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    const profile = req.body;

    const userProfile = await getOrCreateUserProfile(userId);
    const safeProfileData = getSafeProfileParams(profile);
    await userProfile.update({ ...safeProfileData, userId });

    return res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
};
