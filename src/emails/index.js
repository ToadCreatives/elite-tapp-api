const qs = require('querystring');
const log = require('../log');
const config = require('../config');

const { mailQueue } = require('../services/queue');
/**
 * Add mail to queue
 *
 * @param {string} name - name of the mail
 * @param {object} options - options to send mail
 * @param {number} [priority=undefined] - priority of mail(lower the higher)
 */
async function addToMailQueue(name, options, priority = undefined) {
  try {
    await mailQueue.add(name, options, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5 * 1000,
      },
      priority,
      removeOnComplete: true,
    });
  } catch (error) {
    log.error('Error sending mail', error);
  }
}

exports.addToMailQueue = addToMailQueue;

/**
 * Send user verification mail
 *
 * @param {User} user - user
 * @param {string} token - token
 */
async function sendUserVerificationMail(user, token) {
  log.info(`Sending user account verification mail to email:${user.email}`, {
    mail: 'user-verification',
  });

  await addToMailQueue('user-verification', {
    template: 'user-verification',
    to: user.email,
    locals: {
      user,
      link: `${config.redirects.accountVerification}?${qs.stringify({ token })}`,
    },
  });
}

exports.sendUserVerificationMail = sendUserVerificationMail;

/**
 * Send password reset mail
 *
 * @param {User} user - user
 * @param {string} token - token
 */
async function sendPasswordResetMail(user, token) {
  log.info(`Sending password reset to email:${user.email}`, {
    mail: 'password-reset',
  });

  await addToMailQueue('password-reset', {
    template: 'password-reset',
    to: user.email,
    locals: {
      user,
      link: `${config.redirects.passwordReset}?${qs.stringify({ token })}`,
    },
  });
}

exports.sendPasswordResetMail = sendPasswordResetMail;
