const UserProfile = require('../../../models/userProfile.model');

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

exports.getOrCreateUserProfile = getOrCreateUserProfile;
