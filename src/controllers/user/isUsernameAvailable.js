const httpStatus = require('http-status');
const User = require('../../models/user.model');

exports.isUsernameAvailable = async (req, res, next) => {
  try {
    const { value } = req.query;

    const existingUser = await User.findOne({
      where: {
        username: value,
      },
      attributes: ['id'],
    });

    return res.status(httpStatus.OK).json({ available: !existingUser });
  } catch (err) {
    next(err);
  }
};
