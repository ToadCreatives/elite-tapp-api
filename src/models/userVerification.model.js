const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

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
    type: Sequelize.STRING,
  },
  verificationId: {
    type: Sequelize.STRING,
    unique: true,
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
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'userVerification',
});

module.exports = UserVerification;
