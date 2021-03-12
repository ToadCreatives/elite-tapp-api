const { v4: uuid } = require('uuid');

/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('interests', [
      {
        id: uuid(),
        title: 'Sports',
      },
      {
        id: uuid(),
        title: 'Trees',
      },
      {
        id: uuid(),
        title: 'Tea',
      },
      {
        id: uuid(),
        title: 'Coffee',
      },
      {
        id: uuid(),
        title: 'Yoga',
      },
      {
        id: uuid(),
        title: 'Art',
      },
      {
        id: uuid(),
        title: 'Dance',
      },
      {
        id: uuid(),
        title: 'Writing',
      },
      {
        id: uuid(),
        title: 'Reading',
      },
      {
        id: uuid(),
        title: 'Blogging',
      },
      {
        id: uuid(),
        title: 'Music',
      },
      {
        id: uuid(),
        title: 'Games',
      },
    ], {

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('interests', null, {});
  },
};
