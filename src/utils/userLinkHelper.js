const urljoin = require('url-join');
const { Tiers } = require('./tiers');
const { isUri } = require('./url');

// TODO: add other providers
const providers = {
  // free social
  facebook: {
    pathPrefix: 'https://facebook.com',
    tier: Tiers.free,
  },
  twitter: {
    pathPrefix: 'https://twitter.com',
    tier: Tiers.free,
  },
  instagram: {
    pathPrefix: 'https://www.instagram.com',
    tier: Tiers.free,
  },
  pinterest: {
    pathPrefix: 'https://www.pinterest.com',
    tier: Tiers.free,
  },
  twitch: {
    pathPrefix: 'http://twitch.tv',
    tier: Tiers.free,
  },
  snapchat: {
    pathPrefix: 'https://www.snapchat.com/add',
    tier: Tiers.free,
  },
  linktree: {
    pathPrefix: 'https://linktr.ee',
    tier: Tiers.free,
  },

  // free contacts
  text: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  email: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  whatsapp: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  address: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  facetime: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  call: {
    pathPrefix: null,
    tier: Tiers.free,
  },

  // free music
  spotify: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  applemusic: {
    pathPrefix: null,
    tier: Tiers.free,
  },
  soundcloud: {
    pathPrefix: 'https://soundcloud.com',
    tier: Tiers.free,
  },

  // free payments
  paypal: {
    pathPrefix: 'https://paypal.com',
    tier: Tiers.free,
  },
  venmo: {
    pathPrefix: 'https://venmo.com',
    tier: Tiers.free,
  },
  cashapp: {
    pathPrefix: 'https://cash.app',
    tier: Tiers.free,
  },

  // elite plus
  tiktok: {
    pathPrefix: 'https://tiktok.com',
    tier: Tiers.plus,
  },
  youtube: {
    pathPrefix: null,
    tier: Tiers.plus,
  },
  podcasts: {
    pathPrefix: null,
    tier: Tiers.plus,
  },

  // custom
  website: {
    pathPrefix: null,
    tier: Tiers.plus,
  },
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
  if (isUri(path)) {
    return path;
  }

  const providerData = providers[provider];
  if (providerData) {
    return urljoin(providerData.pathPrefix, path);
  }

  return path;
}

exports.getResourceUrl = getResourceUrl;
