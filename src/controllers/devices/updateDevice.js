const httpStatus = require('http-status');
const NfcDevice = require('../../models/nfcDevice.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');

exports.updateDevice = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, active } = req.body;

    const device = await NfcDevice.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!device) {
      throw new APIError('Unauthorized', httpStatus.UNAUTHORIZED, errorCodes.UnauthorizedDevice);
    }

    await device.update({
      name,
      active,
    });

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
