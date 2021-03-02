const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

class User extends Model {
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  }

  getUserInfo() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username || null,
      email: this.email || null,
      phone: this.phone || null,
      avatar: this.avatar,
      passwordSet: !!this.password,
    };
  }

  static get roles() {
    return ['admin', 'user'];
  }
}

User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(50),
  },
  lastName: {
    type: Sequelize.STRING(50),
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING(30),
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('password', bcrypt.hashSync(val));
    },
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: Sequelize.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
  },
  avatarPath: {
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
  modelName: 'user',
  indexes: [
    {
      unique: true,
      fields: ['username'],
    },
    {
      unique: true,
      fields: ['email'],
    },
    {
      unique: true,
      fields: ['phone'],
    },
  ],
});

module.exports = User;
