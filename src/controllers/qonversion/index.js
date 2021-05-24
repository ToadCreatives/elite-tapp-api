const APIError = require('../../errors/APIError');
const { TRIAL_STARTED, TRIAL_CONVERTED } = require('../../utils/qonversionEvents');

exports.webhook = async (req, res, next) => {
  try {
    const { event_name: eventName } = req.body;

    switch (eventName) {
      case TRIAL_STARTED:
      case TRIAL_CONVERTED:

        break;

      default:
        break;
    }

    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};
