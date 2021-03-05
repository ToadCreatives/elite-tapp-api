// eslint-disable-next-line no-unused-vars
const { SMS } = require('./index');
const { smsQueue } = require('../services/queue');

/**
 * Send SMS by adding to queue
 *
 * @param {SMS} sms
 * @returns
 */
async function sendSMS(sms) {
  return smsQueue.add(
    'send-sms',
    sms,
    {
      removeOnComplete: true,
      attempts: 3,
      backoff: {
        delay: 1000,
        type: 'exponential',
      },
    },
  );
}

exports.sendSMS = sendSMS;
