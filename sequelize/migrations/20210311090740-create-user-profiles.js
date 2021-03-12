module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userProfiles', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
  }),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userProfiles'),
};
