const httpStatus = require('http-status');
const Interest = require('../../models/interest.model');

exports.getInterests = async (req, res, next) => {
  try {
    const interests = await Interest.findAll();

    return res.status(httpStatus.OK).json({ interests });
  } catch (err) {
    next(err);
  }
};
