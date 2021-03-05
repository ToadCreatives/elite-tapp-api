const Twilio = require('twilio');
const { sid, token } = require('../config').twilio;

const client = new Twilio(sid, token);

module.exports = client;
