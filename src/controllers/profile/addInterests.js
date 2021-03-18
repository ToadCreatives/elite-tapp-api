const { Op } = require('sequelize');
const httpStatus = require('http-status');
const sequelize = require('../../services/sequelize');
const Interest = require('../../models/interest.model');
const UserInterest = require('../../models/userInterest.model');
const APIError = require('../../errors/APIError');
const errorCodes = require('../../errors/errorCodes');

/**
 * Validate interests
 *
 * @param {string[]} interests
 */
async function getInterests(interests) {
  const result = await Interest.findAll({
    where: {
      id: {
        [Op.in]: interests,
      },
    },
    attributes: ['id'],
  });

  return result;
}

exports.addInterests = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      interests,
    } = req.body;
    const { user } = req;

    const interestsDAO = await getInterests(interests);
    if (interestsDAO.length !== interests.length) {
      throw new APIError('Invalid interests', httpStatus.BAD_REQUEST, errorCodes.InvalidResources);
    }

    interestsDAO.forEach((interest) => {
      const idx = interests.indexOf(interest.id);
      interest.userInterest = {
        order: idx,
      };
    });

    await sequelize.transaction(async (t) => {
      await user.setInterests(interestsDAO, { through: UserInterest, transaction: t });
    });

    // TODO: update profile

    return res.status(httpStatus.OK).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
