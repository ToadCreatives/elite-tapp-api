const fs = require('fs');
const path = require('path');
const config = require('../src/config');

const dialectOptions = {};
if (config.env === 'production' && config.db.caFile && config.db.caFile.length > 0) {
  const caFile = path.resolve(config.db.caFile);
  // eslint-disable-next-line no-console
  console.info(`CA file enbled, loading from ${caFile}`);
  dialectOptions.ssl = {
    rejectUnauthorized: true,
    ca: fs.readFileSync(caFile),
  };
}

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
  },
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
  },
  production: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    dialectOptions,
  },
};
