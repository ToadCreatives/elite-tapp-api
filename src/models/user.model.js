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
      username: this.username || null,
      email: this.email || null,
      phone: this.phone || null,
      passwordSet: !!this.password,
    };
  }
}

User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
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
