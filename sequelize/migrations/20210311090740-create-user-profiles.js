module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userProfiles', {
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
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
    },
    avatar: {
      type: Sequelize.TEXT,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    gender: {
      type: Sequelize.ENUM,
      values: ['male', 'female'],
      allowNull: true,
    },
  }),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userProfiles'),
};
