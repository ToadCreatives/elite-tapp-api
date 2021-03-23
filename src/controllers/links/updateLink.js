const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const UserLink = require('../../models/userLink');
const { getResourceUrl } = require('../../utils/userLinkHelper');

exports.updateLink = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { id } = req.params;
    const { path = null, visibility = null } = req.body;

    const link = await UserLink.findOne({
      where: {
        id,
        userId,
      },
      attributes: ['id', 'provider', 'visibility'],
    });

    if (!link) {
      throw new APIError('Invalid resource', httpStatus.BAD_REQUEST, errorCodes.InvalidResources);
    }

    if (path) {
      link.path = path;
      link.resourceUrl = getResourceUrl(link.provider, path);
    }

    if (visibility) {
      link.visibility = visibility;
    }

    await link.save();

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
