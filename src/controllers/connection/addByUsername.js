const httpStatus = require('http-status');
const User = require('../../models/user.model');
const UserConnection = require('../../models/userConnection.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const sequelize = require('../../services/sequelize');

exports.addByUsername = async (req, res, next) => {
  try {
    // TODO: check if user is blocked

    const { user } = req;
    const { username } = req.body;
    const userId = user.id;

    const connectionUser = await User.findOne({
      where: {
        username,
      },
      attributes: ['id', 'username'],
    });

    if (user.username === connectionUser.username) {
      throw new APIError(
        'Cannot add yourself as a connection',
        httpStatus.BAD_REQUEST,
        errorCodes.ValidationError,
      );
    }

    if (!connectionUser) {
      throw new APIError(
        'User not found',
        httpStatus.NOT_FOUND,
        errorCodes.UserNotFound,
      );
    }

    await sequelize.transaction(async (t) => {
      await UserConnection.CreateConnection(
        userId,
        connectionUser.id,
        { transaction: t },
      );
    });

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
