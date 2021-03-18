const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const UserLink = require('../../models/userLink');
const { getResourceUrl } = require('../../utils/userLinkHelper');

exports.updateLink = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { linkId: id } = req.params;
    const { path = null } = req.body;

    const link = await UserLink.findOne({
      where: {
        id,
        userId,
      },
      attributes: ['provider', 'id'],
    });

    if (!link) {
      throw new APIError('Invalid resource', httpStatus.BAD_REQUEST, errorCodes.InvalidResources);
    }

    await link.update({
      path,
      resourceUrl: getResourceUrl(link.provider, path),
    });

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
