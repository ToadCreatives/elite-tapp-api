const urljoin = require('url-join');
const { Tiers } = require('./tiers');
const { isUri } = require('./url');

// TODO: add other providers
const providers = {
  // free social
  facebook: {
    pathPrefix: 'https://facebook.com',
    isUrl: true,
    tier: Tiers.free,
  },
  twitter: {
    pathPrefix: 'https://twitter.com',
    isUrl: true,
    tier: Tiers.free,
  },
  instagram: {
    pathPrefix: 'https://www.instagram.com',
    isUrl: true,
    tier: Tiers.free,
  },
  pinterest: {
    pathPrefix: 'https://www.pinterest.com',
    isUrl: true,
    tier: Tiers.free,
  },
  twitch: {
    pathPrefix: 'http://twitch.tv',
    isUrl: true,
    tier: Tiers.free,
  },
  snapchat: {
    pathPrefix: 'https://www.snapchat.com/add',
    isUrl: true,
    tier: Tiers.free,
  },
  linktree: {
    pathPrefix: 'https://linktr.ee',
    isUrl: true,
    tier: Tiers.free,
  },

  // free contacts
  text: {
    pathPrefix: 'sms:',
    isUrl: false,
    tier: Tiers.free,
  },
  email: {
    pathPrefix: 'mailto:',
    isUrl: false,
    tier: Tiers.free,
  },
  whatsapp: {
    pathPrefix: null,
    isUrl: false,
    tier: Tiers.free,
  },
  address: {
    pathPrefix: null,
    isUrl: false,
    tier: Tiers.free,
  },
  facetime: {
    pathPrefix: 'facetime://',
    isUrl: true,
    tier: Tiers.free,
  },
  call: {
    pathPrefix: 'tel:',
    isUrl: false,
    tier: Tiers.free,
  },

  // free music
  spotify: {
    pathPrefix: null,
    isUrl: true,
    tier: Tiers.free,
  },
  applemusic: {
    pathPrefix: null,
    isUrl: true,
    tier: Tiers.free,
  },
  soundcloud: {
    pathPrefix: 'https://soundcloud.com',
    isUrl: true,
    tier: Tiers.free,
  },

  // free payments
  paypal: {
    pathPrefix: 'https://paypal.com',
    isUrl: true,
    tier: Tiers.free,
  },
  venmo: {
    pathPrefix: 'https://venmo.com',
    isUrl: true,
    tier: Tiers.free,
  },
  cashapp: {
    pathPrefix: 'https://cash.app',
    isUrl: true,
    tier: Tiers.free,
  },

  // elite plus
  tiktok: {
    pathPrefix: 'https://tiktok.com',
    isUrl: true,
    tier: Tiers.plus,
  },
  youtube: {
    pathPrefix: null,
    isUrl: true,
    tier: Tiers.plus,
  },
  podcasts: {
    pathPrefix: null,
    isUrl: true,
    tier: Tiers.plus,
  },

  // custom
  website: {
    pathPrefix: null,
    isUrl: true,
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
  if (providerData.isUrl) {
    return urljoin(providerData.pathPrefix, path);
  }
  if (!providerData.isUrl && providerData.pathPrefix) {
    return [providerData.pathPrefix, path].join('');
  }

  return path;
}

exports.getResourceUrl = getResourceUrl;
