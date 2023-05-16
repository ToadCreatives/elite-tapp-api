const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user.model');

const { Model } = Sequelize;

class NfcDevice extends Model {
}

NfcDevice.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  deviceUid: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'nfcDevice',
});

NfcDevice.belongsTo(User);

module.exports = NfcDevice;
