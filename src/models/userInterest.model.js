const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

const User = require('./user.model');
const Interest = require('./interest.model');

class UserInterest extends Model {
}

UserInterest.init({
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'userInterest',
});

User.belongsToMany(Interest, { through: UserInterest });
Interest.belongsToMany(User, { through: UserInterest });

module.exports = UserInterest;
