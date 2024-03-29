const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

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
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
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
  modelName: 'passwordResetRequest',
});

PasswordResetRequest.belongsTo(User);

module.exports = PasswordResetRequest;
