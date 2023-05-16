const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class Subscription extends Model {
}

Subscription.init({
  userId: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
    primaryKey: true,
  },
  expiresAt: {
    type: Sequelize.DATE,
  },
  plan: {
    type: Sequelize.STRING,
  },
  isTrial: {
    type: Sequelize.BOOLEAN,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'subscription',
});

Subscription.belongsTo(User);
User.hasOne(Subscription);

module.exports = Subscription;
