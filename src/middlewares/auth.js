const passport = require('passport');
const httpStatus = require('http-status');
const bluebird = require('bluebird');
const APIError = require('../errors/APIError');

// handleJWT with roles
const handleJWT = (req, res, next, options) => async (err, user, info) => {
  const error = err || info;
  const logIn = bluebird.promisify(req.logIn);
  const apiError = new APIError(
    error ? error.message : 'Unauthorized',
    httpStatus.UNAUTHORIZED,
  );

  // log user in
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (options) {
    if (options.usernameRequired === true && !user.username) {
      return next(new APIError('Unauthorized', httpStatus.UNAUTHORIZED));
    }
  }

  req.user = user;

  return next();
};

// exports the middleware

// eslint-disable-next-line max-len
const authorize = (
  options = {
    usernameRequired: true,
  },
) => (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  handleJWT(req, res, next, options),
)(req, res, next);

module.exports = authorize;
