/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userInterests', {
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
      interestId: {
        type: Sequelize.UUID,
        references: {
          model: 'interests',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userInterests');
  },
};
