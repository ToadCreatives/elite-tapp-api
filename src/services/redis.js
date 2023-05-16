const blueBird = require('bluebird');
const redis = require('redis');
const config = require('../config');
const log = require('../log');

blueBird.promisifyAll(redis);

const client = redis.createClient(config.redis.primary, {
  tls: {
    rejectUnauthorized: false,
  },
});

client.on('error', (err) => {
  log.error('Redis Primary: ', err);
});

client.on('connect', () => {
  log.info('Redis primary connected');
});

module.exports = client;
