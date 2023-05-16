const httpStatus = require('http-status');
const axios = require('axios');

const User = require('../../models/user.model');
const rc = require('../../config').revenueCat;
const logger = require('../../log');

exports.deleteAccount = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;

    await User.destroy({ where: { id: userId } });
    try {
      const resp = await axios.default.delete(`https://api.revenuecat.com/v1/subscribers/${userId}`, {
        headers: {
          Authorization: `Bearer ${rc.secretApiKey}`,
          'Content-Type': 'application/json',
        },
      });
      if (resp.status === httpStatus.OK) {
        logger.info(`Deleted revenuecat user data for ${userId}`, { type: 'revenuecat', event: 'delete' });
      }
    } catch (error) {
      logger.error(`Error deleting revenuecat user data for ${userId}`, {
        type: 'revenuecat', event: 'delete', response: error.response.data || {}, error: error.stack || {},
      });
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};
