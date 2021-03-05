const Twilio = require('twilio');
const config = require('../config');

const client = new Twilio(config.twilio.sid, config.twilio.token);

module.exports = client;
