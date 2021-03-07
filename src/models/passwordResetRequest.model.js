const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

class PasswordResetRequest extends Model {

}

PasswordResetRequest.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  verificationId: {
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

module.exports = PasswordResetRequest;