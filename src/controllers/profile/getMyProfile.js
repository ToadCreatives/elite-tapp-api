const httpStatus = require('http-status');
const UserProfile = require('../../models/userProfile.model');

exports.getMyProfile = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    const profile = await UserProfile.findOne({
      where: {
        userId,
      },
      attributes: {
        exclude: ['userId', 'id'],
      },
    });

    const result = profile ? profile.profileDto() : {};
    return res.status(httpStatus.OK).json({ profile: result });
  } catch (err) {
    next(err);
  }
};
