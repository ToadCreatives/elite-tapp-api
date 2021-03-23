const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
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
    type: Sequelize.STRING(50),
    defaultValue: 'connections-only',
  },
  path: {
    type: Sequelize.TEXT,
  },
  resourceUrl: {
    type: Sequelize.TEXT,
  },
}, {
  sequelize,
  modelName: 'userLink',
});

UserLink.belongsTo(User);

module.exports = UserLink;
