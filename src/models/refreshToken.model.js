const Sequelize = require('sequelize');
const crypto = require('crypto');
const sequelize = require('../services/sequelize');

const { Model } = Sequelize;

class RefreshToken extends Model {
  /**
   * Generates a refresh token for an user id
   *
   * @static
   * @param {*} userId
   * @returns
   * @memberof RefreshToken
   */
  static async generate(userId) {
    // check if user already has a issued token
    const prevToken = await RefreshToken.findOne({ userId });
    if (prevToken) {
      return prevToken.token;
    }

    // remove previous token and issue new
    await this.findOneAndDelete({ user: userId });
    const token = `${userId}.${crypto.randomBytes(64).toString('hex')}`;

    await RefreshToken.create({
      token,
      userId,
    });

    return token;
  }
}

RefreshToken.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'refreshToken',
  timestamps: false,
});

module.exports = RefreshToken;
