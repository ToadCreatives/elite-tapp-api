module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex('users', ['username'], { fields: 'username', unique: true });
    await queryInterface.addIndex('users', ['email'], { fields: 'email', unique: true });
    await queryInterface.addIndex('users', ['phone'], { fields: 'phone', unique: true });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
