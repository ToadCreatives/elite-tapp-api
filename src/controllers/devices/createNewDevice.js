const httpStatus = require('http-status');
const NfcDevice = require('../../models/nfcDevice.model');

exports.registerNewDevice = async (req, res, next) => {
  try {
    const { user } = req;
    const { serialNo } = req.body;

    const device = await NfcDevice.create({
      serialNo,
      userId: user.id,
      active: true,
    });

    return res.status(httpStatus.CREATED).json({
      device: {
        ...device.toJSON(),
        userId: undefined,
      },
    });
  } catch (err) {
    next(err);
  }
};
