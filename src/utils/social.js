const UserConnection = require('../models/userConnection.model');

const VisibilityLevels = {
  'connections-only': 1, // visible for connections
  public: 2, // visible for everyone
};

exports.VisibilityLevels = VisibilityLevels;

/**
 * Get name for visibility level
 *
 * @param {number} level
 * @returns
 */
function getVisibilityLevelName(level) {
  switch (level) {
    case VisibilityLevels['connections-only']:
      return 'connections-only';

    default:
      return 'public';
  }
}

exports.getVisibilityLevelName = getVisibilityLevelName;

/**
 * get visibility level
 *
 * @param {string} person1Id
 * @param {string} person2Id
 * @returns {Promise<number>}
 */
async function getConnectionVisibilityLevel(person1Id, person2Id) {
  if (!person1Id) {
    return VisibilityLevels.public;
  }

  const connection = await UserConnection.findOne({
    where: {
      userId: person1Id,
      connectionId: person2Id,
    },
  });

  return connection
    ? VisibilityLevels['connections-only']
    : VisibilityLevels.public;
}

exports.getConnectionVisibilityLevel = getConnectionVisibilityLevel;
