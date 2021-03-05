const Redis = require('ioredis');
const { Queue, Worker, QueueScheduler } = require('bullmq');
const path = require('path');

const log = require('../log');
const { queue } = require('../config').redis;

// mail
const mailConnection = new Redis(queue);
mailConnection.on('error', (error) => {
  log.error(error, { redis: 'queue:mail' });
});
mailConnection.on('connect', () => {
  log.info('connected', { redis: 'queue:mail' });
});

const mailProcessor = path.join(__dirname, '../emails/mailer.js');

const mailWorker = new Worker('mail', mailProcessor, {
  connection: mailConnection,
  limiter: {
    max: 100,
    duration: 1000,
  },
});
mailWorker.on('error', (error) => {
  log.error(error, { queue: 'mail' });
});

const mailQueue = new Queue('mail', { connection: mailConnection });
mailQueue.on('error', (error) => {
  log.error(error, { queue: 'mail' });
});

const mailSchedConnection = new Redis(queue);
mailSchedConnection.on('error', (error) => {
  log.error(error, { redis: 'queue:mail' });
});
mailSchedConnection.on('connect', () => {
  log.info('connected', { redis: 'queue:mail' });
});
const mailQueueScheduler = new QueueScheduler('mail', { connection: mailSchedConnection });
mailQueueScheduler.on('error', (error) => {
  log.error(error, { queue: 'mail' });
});

exports.mailQueue = mailQueue;

// sms
const smsConn = new Redis(queue);
smsConn.on('error', (error) => {
  log.error(error, { redis: 'queue:sms' });
});
smsConn.on('connect', () => {
  log.info('connected', { redis: 'queue:sms' });
});
const smsProcessor = path.join(__dirname, '../queues/sms.js');

const smsWorker = new Worker('sms', smsProcessor, {
  connection: smsConn,
  limiter: {
    max: 100,
    duration: 1000,
  },
});
smsWorker.on('error', (error) => {
  log.error(error, { queue: 'sms' });
});

const smsQueue = new Queue('sms', { connection: smsConn });
smsQueue.on('error', (error) => {
  log.error(error, { queue: 'sms' });
});

const smsQueueScheduler = new QueueScheduler('sms', { connection: smsConn });
smsQueueScheduler.on('error', (error) => {
  log.error(error, { queue: 'sms' });
});

exports.smsQueue = smsQueue;
