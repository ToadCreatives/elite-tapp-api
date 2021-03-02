require('dotenv').config(); // load .env file

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  hostname: process.env.HOSTNAME,
  mongo: {
    uri: process.env.MONGOURI,
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    caFile: process.env.DB_CA_FILE,
    url: process.env.DATABASE_URL,
  },
  token: {
    expiration: process.env.TOKEN_EXPIRATION || 1,
    expirationUnit: process.env.TOKEN_EXPIRATION_UNIT || 'hour',
  },
  transporter: {
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    username: process.env.TRANSPORTER_USERNAME,
    password: process.env.TRANSPORTER_PASSWORD,
  },
  isDevEnv: process.env.NODE_ENV === 'development',
};
