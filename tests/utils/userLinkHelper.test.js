const { getResourceUrl } = require('../../src/utils/userLinkHelper');

test('should use @ with tiktok when @ is not given', () => {
  const result = getResourceUrl('tiktok', 'user');
  expect(result).toBe('https://tiktok.com/@user');
});

test('should use single @ sign when @ presents in username', () => {
  const result = getResourceUrl('tiktok', '@user');
  expect(result).toBe('https://tiktok.com/@user');
});

test('should use the given username when multiple @ signs are provided', () => {
  const result = getResourceUrl('tiktok', '@@@user');
  expect(result).toBe('https://tiktok.com/@@@user');
});

test('should return url path when url is input', () => {
  const result = getResourceUrl('tiktok', 'https://tiktok.com/@@@user');
  expect(result).toBe('https://tiktok.com/@@@user');
});
