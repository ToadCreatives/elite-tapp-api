const UserLink = require('../../models/userLink');

/**
 * Get next link order
 *
 * @param {Sequelize.Transaction} t - transaction
 * @param {string} userId - user id
 * @returns
 */
async function getNextRank(t, userId) {
  const lastLink = await UserLink.findOne({
    where: {
      userId,
    },
    order: [['order', 'DESC']],
    transaction: t,
  });

  if (!lastLink) {
    return 0;
  }
  return lastLink.order + 1;
}

exports.addLink = async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.id;
    const { provider, path } = req.body;

    // TODO check this user elighble to add this link

    const nextVal = await getNextRank(userId);
  } catch (err) {
    next(err);
  }
};
