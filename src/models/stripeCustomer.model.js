const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class StripeCustomer extends Model {
}

StripeCustomer.init({
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
  billingEmail: {
    type: Sequelize.STRING,
  },
  stripeCustomerId: {
    type: Sequelize.STRING,
  },
  stripeDefaultPaymentMethodId: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'stripeCustomer',
});

StripeCustomer.belongsTo(User);
User.hasOne(StripeCustomer);

module.exports = StripeCustomer;
