/* eslint-disable no-unused-vars */
const { v4: uuid } = require('uuid');

const interests = [
  'Travel',
  'Entrepreneurship',
  'Adventure',
  'Sports',
  'Pets',
  'Technology',
  'Comedy',
  'Art',
  'Music',
  'Outdoors',
  'Influencer',
  'Working Out',
  'Movies',
  'Concerts',
  'Gaming',
  'Mental Health',
  'LGBTQ+',
  'Food',
  'Dancing',
  'Reading',
];

/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // await queryInterface.bulkInsert(
    //   'interests',
    //   interests.map((interest) => ({ id: uuid(), title: interest })),
    //   {},
    // );
  },

  down: async (queryInterface, Sequelize) => {

    // await queryInterface.bulkDelete('interests', null, {});
  },
};
