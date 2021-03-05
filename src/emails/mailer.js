// eslint-disable-next-line no-unused-vars
const { Job } = require('bullmq');
const Email = require('email-templates');
const path = require('path');
const config = require('../config');
const transport = require('../services/transport');
const log = require('../log');

const mailNoReply = new Email({
  message: {
    from: config.mail.noReplyFrom,
  },
  send: true,
  transport,
  subjectPrefix: `${config.app} - `,
  views: {
    options: {
      extension: 'hbs', // <---- HERE
    },
  },
});

/**
 * sends a mail
 *
 * @param {Job} job
 */
async function processor(job) {
  const { name } = job;
  const { to, locals, template } = job.data;
  log.info(`sending mail to ${to} mail:${name} job:${job.id}`, { queue: 'mail', mail: name });

  try {
    await mailNoReply.send({
      message: {
        to,
      },
      locals: {
        ...locals,
        config,
      },
      template: path.resolve(__dirname, template, 'template'), // look in template dir eg ..user-activation/template
    });
    log.info(`sent mail to ${to} mail:${name} job:${job.id}`, { queue: 'mail', mail: name });
    return true;
  } catch (error) {
    log.error(`error sending mail to ${to} mail:${name} job:${job.id} error:${error}`, { queue: 'mail' });
    throw error;
  }
}

module.exports = processor;
