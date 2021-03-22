const Sequelize = require('sequelize');

const sequelize = require('../services/sequelize');
const { getAvatarUrl } = require('../utils/url');
const User = require('./user.model');

const { Model } = Sequelize;

class UserProfile extends Model {
  profileDto() {
    const result = {
      firstName: this.firstName || null,
      lastName: this.lastName || null,
      bio: this.bio || null,
      dateOfBirth: this.dateOfBirth || null,
      gender: this.gender || null,
      avatar: getAvatarUrl(this.avatar || null),
    };

    return result;
  }
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
