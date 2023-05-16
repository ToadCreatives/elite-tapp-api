/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscriptions', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      },
      plan: {
        type: Sequelize.STRING,
      },
      expiresAt: {
        type: Sequelize.DATE,
      },
      isTrial: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subscriptions');
  },
};
