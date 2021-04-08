const httpStatus = require('http-status');
const NfcDevice = require('../../models/nfcDevice.model');
const { generateRandomSecureToken, md5 } = require('../../utils/crypto');

exports.createNewDevice = async (req, res, next) => {
  try {
    const { user } = req;

    const tok1 = await generateRandomSecureToken(25);
    const token = `${md5(user.id)}${tok1}`;

    const device = await NfcDevice.create({
      token,
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
