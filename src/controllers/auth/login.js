const httpStatus = require('http-status');
const User = require('../../models/user.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const RefreshToken = require('../../models/refreshToken.model');
const { generateTokenResponse } = require('./common/generateTokens');

exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({
      $or: [
        { email: login },
        { phone: login },
      ],
    });

    if (!user) {
      throw new APIError('Invalid login or password', httpStatus.UNAUTHORIZED, errorCodes.InvalidCredentials);
    }

    if (!user.verified) {
      throw new APIError('Account not verified', httpStatus.UNAUTHORIZED, errorCodes.AccountNotVerified);
    }

    if (!user.passwordMatches(password)) {
      throw new APIError('Invalid login or password', httpStatus.UNAUTHORIZED, errorCodes.InvalidCredentials);
    }

    const refreshToken = await RefreshToken.generate(user);

    const response = generateTokenResponse(user, refreshToken);
    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

exports.loginRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokObj = await RefreshToken.findOne({ token: refreshToken }).populate('user');
    if (!tokObj) {
      throw new APIError('Unauthorized', httpStatus.UNAUTHORIZED);
    }

    const { user } = tokObj;
    const response = generateTokenResponse(user, refreshToken);
    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

exports.revokeRefreshToken = async (req, res, next) => {
  try {
    const { user } = req;
    await RefreshToken.findOneAndRemove({ user: user._id });
    return res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
};
