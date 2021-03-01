const passportJWT = require('passport-jwt');
const config = require('../config');
const User = require('../models/user.model');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.sub, (err, user) => {
    if (err) {
      return done(err, null);
    }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

exports.jwtOptions = jwtOptions;
exports.jwt = jwtStrategy;
