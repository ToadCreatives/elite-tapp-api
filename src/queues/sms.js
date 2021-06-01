// eslint-disable-next-line no-unused-vars
const { Job } = require('bullmq');
const config = require('../config');
const log = require('../log');
const twilio = require('../services/twilio');

/**
 * send sms
 *
 * @param {Job} job
 */
async function processor(job) {
  try {
    log.info(`Job ID ${job.id} - Sending SMS to ${job.data.to}`, { queue: 'sms' });
    // if (!config.sms.enabled) {
    //   log.info(`SMS is disabled, ignoring Job ID ${job.id}`, { queue: 'sms' });
    //   return true;
    // }
    await twilio.messages.create({
      body: job.data.body,
      from: config.twilio.from,
      to: job.data.to,
      messagingServiceSid: config.twilio.messagingServiceSid,
    });
    return true;
  } catch (error) {
    log.error('Twilio Error', { error, queue: 'sms' });
    throw error;
  }
}

module.exports = processor;
