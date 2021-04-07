const httpStatus = require('http-status');
const { getResourceUrl } = require('../../utils/userLinkHelper');

exports.check = async (req, res, next) => {
  try {
    const { provider, path } = req.query;

    return res.status(httpStatus.OK).json({
      resourceUrl: getResourceUrl(provider, path),
    });
  } catch (err) {
    next(err);
  }
};
