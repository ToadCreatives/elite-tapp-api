const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const APIError = require('../../errors/APIError');
const knex = require('../../services/knex');
const sequelize = require('../../services/sequelize');

exports.getUser = async (req, res, next) => {
  try {
    const { userId, serialNo } = req.params;

    const query = knex
      .select('username')
      .from('users')
      .leftJoin('nfcDevices', 'nfcDevices.userId', 'users.id')
      .where('nfcDevices.serialNo', serialNo)
      .andWhere('nfcDevices.userId', userId)
      .andWhere('nfcDevices.active', true)
      .limit(1);

    const [user] = await sequelize.query(
      query.toQuery(),
      {
        type: QueryTypes.SELECT,
      },
    );

    if (!user) {
      throw new APIError('User not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ user });
  } catch (err) {
    next(err);
  }
};
