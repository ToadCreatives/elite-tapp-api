const nodemailer = require('nodemailer');
const aws = require('aws-sdk/clients/ses');
const { transporter } = require('../config');
const { ses } = require('../aws');

let transport;

if (transporter.provider === 'smtp') {
  const {
    host,
    port,
    password: pass,
    username: user,
  } = transporter.smtp;

  transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  });

  module.exports = transport;
} else if (transporter.provider === 'ses') {
  transport = nodemailer.createTransport({
    SES: { ses, aws },
  });

  module.exports = transport;
}
