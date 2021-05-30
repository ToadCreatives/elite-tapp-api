const httpStatus = require('http-status');
const User = require('../../models/user.model');

exports.deleteAccount = async (req, res, next) => {
  try {
    const { user } = req;

    await User.destroy({ id: user.id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};
