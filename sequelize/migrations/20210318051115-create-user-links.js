module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userLinks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING(25),
      },
      path: {
        type: Sequelize.TEXT,
      },
      resourceUrl: {
        type: Sequelize.TEXT,
      },
      visibility: {
        type: Sequelize.STRING(50),
        defaultValue: 'connections-only',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userLinks');
  },
};
