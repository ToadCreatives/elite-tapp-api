const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

class Gender extends Model {
}

Gender.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'gender',
});

module.exports = Gender;
