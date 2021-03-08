const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const pg = require('pg');
const config = require('../config');
const log = require('../log');

// to cast big int to numbers in JS
pg.defaults.parseInt8 = true;

const sslOptions = {
  rejectUnauthorized: false, // very important
};

const dialectOptions = {
  ssl: config.isProdEnv
    ? sslOptions : false,
};
if (config.env === 'production' && config.db.caFile && config.db.caFile.length > 0) {
  const caFile = path.resolve(config.db.caFile);
  log.info(`CA file enbled, loading from ${caFile}`);
  dialectOptions.ssl = {
    rejectUnauthorized: true,
    ca: fs.readFileSync(caFile),
  };
}

if (config.db.url) {
  log.info('using database url to connect db', { type: 'db' });
  const sequelize = new Sequelize(config.db.url, {
    dialectOptions,
    pool: {
      max: 10,
    },
    logging: (msg) => log.debug(msg),
  });

  module.exports = sequelize;
} else {
  log.info('using database credentials to connect db', { type: 'db' });
  const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    dialectOptions,
    pool: {
      max: 10,
    },
    logging: (msg) => log.debug(msg),
  });

  module.exports = sequelize;
}
