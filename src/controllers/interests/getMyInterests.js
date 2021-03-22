const httpStatus = require('http-status');
const UserInterest = require('../../models/userInterest.model');

exports.getMyInterests = async (req, res, next) => {
  try {
    const { user } = req;

    const interests = await UserInterest.findAll({
      where: {
        userId: user.id,
      },
      attributes: { exclude: ['userId'] },
      order: [['order', 'asc']],
    });

    return res.status(httpStatus.OK).json({ interests });
  } catch (err) {
    next(err);
  }
};
