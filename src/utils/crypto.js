const { customAlphabet, nanoid } = require('nanoid/async');

const fourDigitRandomId = customAlphabet('1234567890', 4);

const crypto = require('crypto');

/**
 * Create md5 hash of string
 *
 * @param {string} data - data
 * @param {('hex'|'base64')} [encoding='hex'] - encoding algorithm
 */
function md5(data, encoding = 'hex') {
  crypto.createHash('md5').update(data).digest(encoding);
}

/**
 * Generate token
 *
 * @param {number} [size=150] - size of token
 * @returns {Promise<string>}
 */
async function generateRandomSecureToken(size = 150) {
  const token = await nanoid(size);
  return token;
}

module.exports = {
  fourDigitRandomId,
  generateRandomSecureToken,
  md5,
};
