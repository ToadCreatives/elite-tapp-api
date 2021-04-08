const httpStatus = require('http-status');
const NfcDevice = require('../../models/nfcDevice.model');

exports.getDevices = async (req, res, next) => {
  try {
    const { user } = req;

    const devices = await NfcDevice.findAll({
      where: {
        userId: user.id,
      },
      attributes: {
        exclude: ['userId'],
      },
      order: [['createdAt', 'DESC']],
    });

    return res.status(httpStatus.OK).json({ devices });
  } catch (err) {
    next(err);
  }
};
