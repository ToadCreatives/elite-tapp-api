const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class SocialLink extends Model {
}

SocialLink.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  provider: {
    type: Sequelize.STRING(25),
  },
  username: {
    type: Sequelize.STRING,
  },
  link: {
    type: Sequelize.STRING,
  },
  order: {
    type: Sequelize.INTEGER,
  },
}, {
  sequelize,
  modelName: 'socialLink',
});

SocialLink.belongsTo(User);

module.exports = SocialLink;
