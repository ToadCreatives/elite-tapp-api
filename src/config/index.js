require('dotenv').config(); // load .env file
const urljoin = require('url-join');

const frontendUrl = process.env.FRONTEND_URL || 'https://elitetapp.me';
const frontUrl = (path) => urljoin(frontendUrl, path);

module.exports = {
  port: process.env.PORT,
  app: process.env.APP || 'EliteTapp',
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  hostname: process.env.HOSTNAME,
  frontendUrl,
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
    smtp: {
      host: process.env.TRANSPORTER_SMTP_HOST,
      port: process.env.TRANSPORTER_SMTP_PORT,
      username: process.env.TRANSPORTER_SMTP_USERNAME,
      password: process.env.TRANSPORTER_SMTP_PASSWORD,
    },
    provider: process.env.TRANSPORTER_PROVIDER || 'ses', // defaults to ses
  },
  mail: {
    noReplyFrom: process.env.NO_REPLY_MAIL_FROM || 'noreply@elitetapp.com',
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    buckets: {
      media: process.env.AWS_BUCKET_MEDIA,
    },
    region: process.env.AWS_REGION,
  },
  redis: {
    primary: process.env.REDIS_PRIMARY_URL,
    queue: process.env.REDIS_QUEUE_URL,
  },
  redirects: {
    accountVerification: frontUrl(process.env.REDIRECT_ACCOUNT_VERIFICATION || '/verify/account'),
    passwordReset: frontUrl(process.env.REDIRECT_PASSWORD_RESET || '/verify/reset/password'),
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    token: process.env.TWILIO_TOKEN,
    from: process.env.TWILIO_FROM,
  },
  resources: {
    images: process.env.RESOURCES_IMAGES || 'https://ik.imagekit.io/ghh7ufjctqp/elitetapp',
  },
  options: {
    openapi: {
      ui: {
        disabled: process.env.OPENAPI_UI_DISABLED === 'true',
      },
    },
  },
  revenueCat: {
    secret: process.env.REVENUECAT_SECRET,
  },
  isDevEnv: process.env.NODE_ENV === 'development',
  isProdEnv: process.env.NODE_ENV === 'production',
};
