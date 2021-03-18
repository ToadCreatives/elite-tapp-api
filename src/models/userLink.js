const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const { getUserLink } = require('../utils/userLinkHelper');
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
  path: {
    type: Sequelize.STRING,
  },
  link: {
    type: Sequelize.VIRTUAL,
    get() {
      return getUserLink(this.getDataValue('provider'), this.getDataValue('path'));
    },
  },
  order: {
    type: Sequelize.INTEGER,
  },
}, {
  sequelize,
  modelName: 'userLink',
});

UserLink.belongsTo(User);

module.exports = UserLink;
