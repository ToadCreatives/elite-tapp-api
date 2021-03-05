const aws = require('aws-sdk');
const config = require('../config');

aws.config.update({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.region,
});

const s3 = new aws.S3({
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

exports.s3 = s3;

const ses = new aws.SES({
  apiVersion: 'latest',
});

exports.ses = ses;
