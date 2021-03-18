const httpStatus = require('http-status');
const { pick } = require('lodash');
const { getOrCreateUserProfile } = require('./common/profile');

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
