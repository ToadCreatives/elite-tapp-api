const httpStatus = require('http-status');
const urljoin = require('url-join');
const { frontendUrl } = require('../../config');
const NfcDevice = require('../../models/nfcDevice.model');
const { generateRandomSecureToken, md5 } = require('../../utils/crypto');

exports.createNewDevice = async (req, res, next) => {
  try {
    const { user } = req;

    const token = `${md5(user.id)}${generateRandomSecureToken(25)}`;

    const device = await NfcDevice.create({
      token,
      userId: user.id,
      active: true,
    });

    return res.status(httpStatus.CREATED).json({
      id: device.id,
      token,
      url: urljoin(frontendUrl, 'u', token),
    });
  } catch (err) {
    next(err);
  }
};
