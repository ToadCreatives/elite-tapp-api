module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userVerifications', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    otpCode: {
      type: Sequelize.STRING,
    },
    verificationId: {
      type: Sequelize.STRING,
      unique: true,
    },
    method: {
      type: Sequelize.ENUM,
      values: ['phone', 'email'],
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
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userVerifications'),
};
