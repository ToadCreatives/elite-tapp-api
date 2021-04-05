const httpStatus = require('http-status');
const UserLink = require('../../models/userLink.model');

exports.list = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    const userLinks = await UserLink.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'ASC']],
      attributes: { exclude: ['updatedAt', 'userId'] },
    });

    return res.status(httpStatus.OK).json({ userLinks });
  } catch (err) {
    next(err);
  }
};
