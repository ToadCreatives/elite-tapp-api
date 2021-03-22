const urljoin = require('url-join');
const config = require('../config');

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

exports.isValidHttpUrl = isValidHttpUrl;

function getAvatarUrl(avatar) {
  if (avatar && !isValidHttpUrl(avatar)) {
    return urljoin(config.resources.images, avatar);
  }
  return avatar;
}

exports.getAvatarUrl = getAvatarUrl;
