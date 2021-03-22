const httpStatus = require('http-status');
const UserLink = require('../../models/userLink');
const { getResourceUrl } = require('../../utils/userLinkHelper');

exports.createLink = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { provider, path } = req.body;

    // TODO check this user elighble to add this link

    const resourceUrl = getResourceUrl(provider, path);
    const result = await UserLink.create({
      provider,
      path,
      userId,
      resourceUrl,
    });

    return res.status(httpStatus.CREATED).json({
      userLink: {
        id: result.id,
        path,
        provider,
        resourceUrl,
        createdAt: result.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};