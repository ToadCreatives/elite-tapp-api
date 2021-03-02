const log = require('../log');
const sequelize = require('./sequelize');

const start = async () => {
  try {
    log.info('Initializing database connection');
    await sequelize.authenticate();
    log.info('Database connected');
  } catch (err) {
    log.error('Error connecting to database', err);
    process.exit(1);
  }

  return true;
};

exports.start = start;
