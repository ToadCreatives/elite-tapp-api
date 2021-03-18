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
/**
 * Generates a presigned url to given resource
 *
 * @param {string} bucket - aws bucket
 * @param {string} key - key to store resource
 * @param {string} contentType - content type of resource
 * @param {string} contentMd5 - md5 hash of content
 * @param {number} expires - expiry time in seconds
 * @param {string} acl - acl of object
 * @returns
 */
async function createUploadReqeust(bucket, key, contentType, contentMd5, expires, acl) {
  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: bucket,
    ContentType: contentType,
    ACL: acl,
    Key: key,
    ContentMD5: contentMd5,
    Expires: expires,
  });
  return {
    path: key, url, expires, method: 'PUT',
  };
}
exports.createUploadReqeust = createUploadReqeust;
/**
* Get a url to access the key for a limited time
*
* @param {string} bucket - s3 bucket
* @param {string} key - resource to access
* @param {number} expires - expiry in seconds
*
* @returns Promise<string> - url to resource
*/
async function getTemporaryAccessUrl(bucket, key, expires) {
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: bucket,
    Key: key,
    Expires: expires,
  });
  return url;
}
exports.getTemporaryAccessUrl = getTemporaryAccessUrl;
