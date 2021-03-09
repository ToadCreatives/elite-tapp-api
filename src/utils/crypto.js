const { customAlphabet, nanoid } = require('nanoid/async');

const fourDigitRandomId = customAlphabet('1234567890', 4);

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
};
