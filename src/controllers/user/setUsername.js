const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const User = require('../../models/user.model');

exports.setUsername = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { username } = req.body;

    const hasUser = await User.findOne({
      where: {
        username,
      },
    });

    if (hasUser && hasUser.id !== userId) {
      throw new APIError(`Username ${username} already taken`, httpStatus.CONFLICT, errorCodes.Conflict);
    }

    await User.update({ username }, {
      where: {
        id: userId,
      },
    });

    return res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
};
