const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class StripePaymentMethod extends Model {
}

StripePaymentMethod.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
  },
  brand: {
    type: Sequelize.STRING,
  },
  lastFour: {
    type: Sequelize.STRING,
  },
  stripePaymentMethodId: {
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
  modelName: 'stripePaymentMethod',
});

StripePaymentMethod.belongsTo(User);
User.hasMany(StripePaymentMethod);

module.exports = StripePaymentMethod;
