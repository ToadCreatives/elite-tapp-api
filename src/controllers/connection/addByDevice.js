const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const UserConnection = require('../../models/userConnection.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const sequelize = require('../../services/sequelize');
const knex = require('../../services/knex');

exports.addByDevice = async (req, res, next) => {
  try {
    // TODO: check if user is blocked

    const { user } = req;
    const { deviceUid } = req.body;
    const userId = user.id;

    const query = knex
      .select('username', 'users.id')
      .from('users')
      .leftJoin('nfcDevices', 'nfcDevices.userId', 'users.id')
      .where('nfcDevices.deviceUid', deviceUid)
      .andWhere('nfcDevices.active', true)
      .limit(1);

    const [connectionUser] = await sequelize.query(
      query.toQuery(),
      {
        type: QueryTypes.SELECT,
      },
    );

    if (!connectionUser) {
      throw new APIError('Invalid device', httpStatus.NOT_FOUND);
    }

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
