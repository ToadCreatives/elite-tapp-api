const urljoin = require('url-join');

const providers = [
  'facebook',
  'twitter',
  'snapchat',
  'instagram',
  'pinterest',
  'twitch',
  'custom',
];

exports.providers = providers;

/**
 * Get social link for provider
 *
 * @param {string} provider
 * @param {string} path
 * @returns
 */
function getUserLink(provider, path) {
  switch (provider) {
    case 'facebook':
      return urljoin('https://facebook.com', path);

    case 'twitter':
      return urljoin('https://twitter.com', path);

    case 'instagram':
      return urljoin('https://www.instagram.com', path);

    case 'pinterest':
      return urljoin('https://www.pinterest.com', path);

    case 'twitch':
      return urljoin('http://twitch.tv', path);

    case 'snapchat':
      return urljoin('https://www.snapchat.com/add', path);

    default:
      return path;
  }
}

exports.getUserLink = getUserLink;
