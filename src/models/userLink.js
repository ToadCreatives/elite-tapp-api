const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const { VisibilityLevels, getVisibilityLevelName } = require('../utils/social');
const User = require('./user.model');

const { Model } = Sequelize;

class UserLink extends Model {
}

UserLink.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  provider: {
    type: Sequelize.STRING(25),
  },
  visibility: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    set(visibility) {
      const level = VisibilityLevels[visibility] || VisibilityLevels['connections-only'];
      this.setDataValue('visibility', level);
    },
    get() {
      return getVisibilityLevelName(this.getDataValue('visibility'));
    },
  },
  path: {
    type: Sequelize.TEXT,
  },
  resourceUrl: {
    type: Sequelize.TEXT,
  },
  elitePlus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'userLink',
});

UserLink.belongsTo(User);
User.hasMany(UserLink);

module.exports = UserLink;
