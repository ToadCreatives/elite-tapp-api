const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class UserVerification extends Model {

}

UserVerification.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  otpCode: {
    type: Sequelize.STRING(6),
  },
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  method: {
    type: Sequelize.ENUM,
    values: ['phone', 'email'],
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'userVerification',
});

UserVerification.belongsTo(User);

module.exports = UserVerification;
