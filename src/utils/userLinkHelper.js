const urljoin = require('url-join');
const { Tiers } = require('./tiers');
const { isUri } = require('./url');

// TODO: add other providers
const providers = {
  // free social
  facebook: {
    pathPrefix: 'https://facebook.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  twitter: {
    pathPrefix: 'https://twitter.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  instagram: {
    pathPrefix: 'https://www.instagram.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  pinterest: {
    pathPrefix: 'https://www.pinterest.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  twitch: {
    pathPrefix: 'http://twitch.tv',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  snapchat: {
    pathPrefix: 'https://www.snapchat.com/add',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  linktree: {
    pathPrefix: 'https://linktr.ee',
    isUrl: true,
    asPathItem: true,
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
    pathPrefix: 'https://wa.me/',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  address: {
    pathPrefix: 'https://www.google.com/maps?q=',
    isUrl: true,
    asPathItem: false,
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
    asPathItem: true,
    tier: Tiers.free,
  },

  // free payments
  paypal: {
    pathPrefix: 'https://paypal.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  venmo: {
    pathPrefix: 'https://venmo.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },
  cashapp: {
    pathPrefix: 'https://cash.app',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.free,
  },

  // elite plus
  tiktok: {
    pathPrefix: 'https://tiktok.com',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.plus,
    pathFormatter: (path) => (path.charAt(0) === '@' ? path : `@${path}`),
  },
  youtube: {
    pathPrefix: 'https://youtube.com/c/',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.plus,
  },
  podcasts: {
    pathPrefix: null,
    isUrl: true,
    tier: Tiers.plus,
  },
  website: {
    pathPrefix: null,
    isUrl: true,
    tier: Tiers.plus,
  },
  linkedin: {
    pathPrefix: 'https://www.linkedin.com/in/',
    isUrl: true,
    asPathItem: true,
    tier: Tiers.plus,
  },
  onlyfans: {
    pathPrefix: 'https://onlyfans.com/',
    isUrl: true,
    asPathItem: true,
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
  if (!path) {
    return '';
  }

  if (isUri(path)) {
    return path;
  }

  const providerData = providers[provider];
  if (providerData.isUrl && providerData.pathPrefix) {
    let formattedPath = path;
    if (providerData.pathFormatter) {
      formattedPath = providerData.pathFormatter(path);
    }

    if (providerData.asPathItem) {
      return encodeURI(urljoin(providerData.pathPrefix, formattedPath));
    }
    return encodeURI([providerData.pathPrefix, formattedPath].join(''));
  }

  if (!providerData.isUrl && providerData.pathPrefix) {
    return [providerData.pathPrefix, path].join('');
  }

  return path;
}

exports.getResourceUrl = getResourceUrl;
