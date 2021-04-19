const httpStatus = require('http-status');
const { getResourceUrl } = require('../../utils/userLinkHelper');

exports.preview = async (req, res, next) => {
  try {
    const { provider, path } = req.body;

    const resourceUrl = getResourceUrl(provider, path);

    return res.status(httpStatus.OK).json({
      resourceUrl,
    });
  } catch (err) {
    next(err);
  }
};
