const httpStatus = require('http-status');
const Subscription = require('../../models/subscription.model');

exports.get = async (req, res, next) => {
  try {
    const { user } = req;
    const subscription = await Subscription.findOne({
      where: {
        userId: user.id,
      },
      attributes: {
        exclude: ['userId'],
      },
    });
    return res.status(httpStatus.OK).json({ subscription });
  } catch (err) {
    next(err);
  }
};
