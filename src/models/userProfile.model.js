const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class UserProfile extends Model {
}

UserProfile.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['male', 'female'],
    allowNull: true,
  },
  avatar: {
    type: Sequelize.TEXT,
  },
}, {
  sequelize,
  modelName: 'userProfile',
  createdAt: false,
  updatedAt: true,
  timestamps: true,
});

UserProfile.belongsTo(User);

module.exports = UserProfile;
