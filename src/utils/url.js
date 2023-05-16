const urljoin = require('url-join');
const { URL } = require('url');
const config = require('../config');

function isValidHttpUrl(data) {
  let url;

  try {
    url = new URL(data);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

exports.isValidHttpUrl = isValidHttpUrl;

function isUri(uri) {
  try {
    // eslint-disable-next-line no-unused-vars
    const _uri = new URL(uri);
    return true;
  } catch (_) {
    return false;
  }
}

exports.isUri = isUri;

function getAvatarUrl(avatar) {
  if (avatar && !isValidHttpUrl(avatar)) {
    return urljoin(config.resources.images, avatar);
  }
  return avatar;
}

exports.getAvatarUrl = getAvatarUrl;
