const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

class Interest extends Model {
}

Interest.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'interest',
});

module.exports = Interest;
