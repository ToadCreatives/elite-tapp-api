const httpStatus = require('http-status');
const Sequelize = require('sequelize');
const { ValidationError } = require('express-validation');
const APIError = require('../errors/APIError');
const errorCodes = require('../errors/errorCodes');
const log = require('../log');

// hanlde not found error
// eslint-disable-next-line no-unused-vars
exports.handleNotFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  res.json(new APIError('Requested resources not found', httpStatus.NOT_FOUND));
  res.end();
};

// handle errors
// eslint-disable-next-line no-unused-vars
exports.handleError = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json(err);
  }

  if (err instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST)
      .json(new APIError(
        err.message,
        httpStatus.BAD_REQUEST,
        errorCodes.ValidationError,
        err.details,
      ));
  }

  if (err instanceof Sequelize.ValidationError) {
    const details = [];
    err.errors.forEach((error) => {
      details.push({
        field: error.path,
        location: 'body',
        messages: [error.message],
      });
    });

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(
        new APIError(
          'Validation Error',
          httpStatus.CONFLICT,
          errorCodes.DuplicateFields,
          details,
        ),
      );
  }

  if (err instanceof Sequelize.Error) {
    log.error('db error ', { type: 'db', error: err });
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(
        new APIError(
          'Unknown error occured',
          httpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
  }

  log.error(`other error ${err}`, { type: 'unkown', error: err });
  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .json(new APIError('Unknown error occured'));
};
