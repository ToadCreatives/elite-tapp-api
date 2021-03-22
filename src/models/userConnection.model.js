const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

const User = require('./user.model');

class UserConnection extends Model {
  static async CreateConnection(firstId, secondId, { transaction }) {
    await UserConnection.bulkCreate([
      { userId: firstId, connectionId: secondId },
      { userId: secondId, connectionId: firstId },
    ], {
      transaction,
      updateOnDuplicate: [],
    });
  }
}

UserConnection.init({}, {
  sequelize,
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  modelName: 'userConnections',
});

User.belongsToMany(User, { through: UserConnection, as: 'connection' });

module.exports = UserConnection;
