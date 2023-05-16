module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nfcDevices', {
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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(
      'nfcDevices',
      ['deviceUid'],
      {
        fields: 'deviceUid',
        unique: true,
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nfcDevices');
  },
};
