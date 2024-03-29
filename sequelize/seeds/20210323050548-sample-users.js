/* eslint-disable no-unused-vars */
const { v4: uuid } = require('uuid');
const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');
const { sampleSize } = require('lodash');

function getAvatar(gender) {
  switch (gender) {
    case 'male':
      return 'https://ik.imagekit.io/ghh7ufjctqp/elitetapp/avatars/sample/male.png';
    case 'female':
      return 'https://ik.imagekit.io/ghh7ufjctqp/elitetapp/avatars/sample/female.png';
    default:
      return null;
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genders = ['male', 'female', null];
    const users = [];
    const userProfiles = [];
    const userInterests = [];

    for (let i = 0; i < 100; i += 1) {
      users.push({
        id: uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: bcrypt.hashSync('password'),
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    users.forEach((user) => {
      const gender = genders[Math.floor(Math.random() * genders.length)];

      userProfiles.push({
        userId: user.id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender,
        bio: faker.lorem.sentence(),
        dateOfBirth: faker.date.past(),
        updatedAt: new Date(),
        avatar: getAvatar(gender),
      });
    });

    const interestsDao = await queryInterface.sequelize.query(
      'SELECT id FROM interests',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    const interests = interestsDao.map((i) => i.id);

    users.forEach((user) => {
      const selectedInterests = sampleSize(
        interests,
        Math.floor(1 + (Math.random() * 5)),
      );
      selectedInterests.forEach((interestId, order) => {
        userInterests.push({
          userId: user.id,
          interestId,
          order,
        });
      });
    });

    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('userProfiles', userProfiles, {});
    await queryInterface.bulkInsert('userInterests', userInterests, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userInterests', null, {});
    await queryInterface.bulkDelete('userProfiles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
