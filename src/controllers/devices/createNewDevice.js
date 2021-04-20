const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const NfcDevice = require('../../models/nfcDevice.model');

exports.registerNewDevice = async (req, res, next) => {
  try {
    const { user } = req;
    const { name = null, deviceUid } = req.body;

    const existingDevice = await NfcDevice.findOne({
      where: {
        deviceUid,
      },
      attributes: ['id'],
    });

    if (existingDevice) {
      throw new APIError('Device already registered', httpStatus.CONFLICT, errorCodes.Conflict);
    }

    const device = await NfcDevice.create({
      deviceUid,
      userId: user.id,
      name,
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
