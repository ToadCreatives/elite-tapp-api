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
  path: {
    type: Sequelize.STRING,
  },
  resourceUrl: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  modelName: 'userLink',
});

UserLink.belongsTo(User);

module.exports = UserLink;
