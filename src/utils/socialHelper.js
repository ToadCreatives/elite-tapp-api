const urljoin = require('url-join');

/**
 * Get social link for provider
 *
 * @param {string} provider
 * @param {string} path
 * @returns
 */
function getSocialProfileLink(provider, path) {
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

    case ''

    default:
      return path;
  }
}

exports.getSocialProfileLink = getSocialProfileLink;
