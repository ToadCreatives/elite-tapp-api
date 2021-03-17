const httpStatus = require('http-status');
const NfcDevice = require('../../models/nfcDevice.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');

exports.deleteDevice = async (req, res, next) => {
  try {
    const { user } = req;
    const { deviceId } = req.params;

    const device = await NfcDevice.findOne({
      where: {
        id: deviceId,
        userId: user.id,
      },
    });

    if (!device) {
      throw new APIError('Unauthorized', httpStatus.UNAUTHORIZED, errorCodes.UnauthorizedDevice);
    }

    await device.destroy();

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
