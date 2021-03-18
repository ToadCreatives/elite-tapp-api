const urljoin = require('url-join');

// TODO: add other providers
const providers = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  instagram: 'https://www.instagram.com',
  pinterest: 'https://www.pinterest.com',
  twitch: 'http://twitch.tv',
  snapchat: 'https://www.snapchat.com/add',
  linktree: 'https://linktr.ee',
  text: null,
  email: null,
  whatsapp: null,
  address: null,
  facetime: null,
  call: null,
  custom: null,
};

exports.providers = providers;
exports.providerNames = Object.keys(providers);

/**
 * Get social link for provider
 *
 * @param {string} provider
 * @param {string} path
 * @returns
 */
function getResourceUrl(provider, path) {
  const providerData = providers[provider];
  if (providerData) {
    return urljoin(providerData, path);
  }

  return path;
}

exports.getResourceUrl = getResourceUrl;
