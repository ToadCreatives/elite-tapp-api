const passportJWT = require('passport-jwt');
const config = require('../config');
const User = require('../models/user.model');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  const userId = jwtPayload.sub;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    return done(error, null);
  }
});

exports.jwtOptions = jwtOptions;
exports.jwt = jwtStrategy;
