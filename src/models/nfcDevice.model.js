const Sequelize = require('sequelize');
const urljoin = require('url-join');
const sequelize = require('../services/sequelize');
const User = require('./user.model');
const { frontendUrl } = require('../config');

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
  token: {
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
  url: {
    type: Sequelize.VIRTUAL,
    get() {
      return urljoin(frontendUrl, 'u', this.getDataValue('token'));
    },
  },
}, {
  sequelize,
  modelName: 'nfcDevice',
});

NfcDevice.belongsTo(User);

module.exports = NfcDevice;
