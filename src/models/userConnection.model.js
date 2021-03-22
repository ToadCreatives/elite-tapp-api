const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

const User = require('./user.model');

class UserConnection extends Model {
  static async CreateConnection(firstId, secondId, { transaction }) {
    const records = [];
    const firstSecondEdge = await UserConnection.findOne({
      where: {
        userId: firstId,
        connectionId: secondId,
      },
      transaction,
    });
    if (!firstSecondEdge) {
      records.push({
        userId: firstId,
        connectionId: secondId,
      });
    }

    const secondFirstEdge = await UserConnection.findOne({
      where: {
        connectionId: firstId,
        userId: secondId,
      },
      transaction,
    });

    if (!secondFirstEdge) {
      records.push({
        connectionId: firstId,
        userId: secondId,
      });
    }

    if (records.length > 0) {
      await UserConnection.bulkCreate(records, { transaction });
    }
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
