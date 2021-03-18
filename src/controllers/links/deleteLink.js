const httpStatus = require('http-status');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');
const UserLink = require('../../models/userLink');

exports.deleteLink = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { id } = req.params;

    const resultRows = await UserLink.destroy({
      where: {
        userId,
        id,
      },
    });

    if (resultRows !== 1) {
      throw new APIError('Invalid resource', httpStatus.BAD_REQUEST, errorCodes.InvalidResources);
    }

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    next(err);
  }
};
