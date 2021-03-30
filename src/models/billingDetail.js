const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class BillingDetail extends Model {
}

BillingDetail.init({
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
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.JSON,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'billingDetail',
});

BillingDetail.belongsTo(User);
User.hasOne(BillingDetail);

module.exports = BillingDetail;
