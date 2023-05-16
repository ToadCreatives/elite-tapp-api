const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const knex = require('../../services/knex');
const sequelize = require('../../services/sequelize');
const { getAvatarUrl } = require('../../utils/url');

exports.list = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    const query = knex
      .from('users')
      .select('firstName', 'lastName', 'avatar', 'username', 'users.createdAt')
      .leftJoin('userConnections', 'users.id', 'userConnections.connectionId')
      .leftJoin('userProfiles', 'users.id', 'userProfiles.userId')
      .where('userConnections.userId', userId)
      .orderBy('firstName', 'asc');

    const connectionsDAOs = await sequelize.query(
      query.toQuery(),
      {
        type: QueryTypes.SELECT,
      },
    );

    const connections = connectionsDAOs.map((conn) => ({
      ...conn,
      avatar: getAvatarUrl(conn.avatar),
    }));

    return res.status(httpStatus.OK).json({ connections });
  } catch (err) {
    next(err);
  }
};
