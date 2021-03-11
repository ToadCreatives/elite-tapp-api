const httpStatus = require('http-status');
const { pick } = require('lodash');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const Gender = require('../../models/gender.model');
const UserProfile = require('../../models/userProfile.model');

async function validateGender(genderId) {
  const gender = await Gender.findByPk(genderId, { attributes: ['id'] });
  if (!gender) {
    return false;
  }

  return true;
}

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
      'genderId',
    ],
  );
}

exports.updateProfile = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    const profile = req.body;

    if (profile.genderId) {
      const validGender = await validateGender(profile.genderId);
      if (!validGender) {
        throw new APIError('Invalid gender', httpStatus.UNPROCESSABLE_ENTITY, errorCodes.InvalidGender);
      }
    }

    const userProfile = await getOrCreateUserProfile(userId);
    const safeProfileData = getSafeProfileParams(profile);
    await userProfile.update({ ...safeProfileData, userId });

    return res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
};
