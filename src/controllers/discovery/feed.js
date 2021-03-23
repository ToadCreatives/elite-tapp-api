const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const knex = require('../../services/knex');
const sequelize = require('../../services/sequelize');

exports.feed = async (req, res, next) => {
  try {
    const { interests = [], limit = 20 } = req.query;

    const query = knex
      .from('users')
      .select('users.id', 'username', 'firstName', 'lastName', 'avatar')
      .leftJoin('userProfiles', 'users.id', 'userProfiles.userId')
      .where('users.verified', 'true')
      .whereNot('users.id', req.user.id)
      .limit(limit)
      .orderByRaw('random()');

    if (interests.length > 0) {
      query.whereIn(
        'users.id',
        knex
          .select('userId')
          .from('userInterests')
          .where('interestId', 'in', interests)
          .groupBy('userId')
          .havingRaw('count(*) = ??', [interests.length]),
      );
    }

    const feed = await sequelize.query(
      query.toQuery(),
      {
        type: QueryTypes.SELECT,
      },
    );

    return res.status(httpStatus.OK).json({ feed });
  } catch (err) {
    next(err);
  }
};
