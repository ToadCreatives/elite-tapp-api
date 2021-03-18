const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const passportStrategy = require('./passport');
const apiRouter = require('../routes/api');
const errorHandler = require('../middlewares/error-handler');
const config = require('../config');
const log = require('../log');
const { start } = require('./init');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
    console.log(buf.toString());
  },
}));
app.use(express.urlencoded({ extended: true }));

// setup openapi
if (!config.options.openapi.ui.disabled) {
  const openApiDocument = YAML.load(path.resolve(__dirname, '../../openapi/v1/api.yaml'));
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(openApiDocument));
}

if (config.env !== 'test') app.use(morgan('combined'));

// passport
app.use(passport.initialize());
passport.use('jwt', passportStrategy.jwt);

app.use('/api/v1', apiRouter);

app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

exports.start = () => {
  app.listen(config.port, async (err) => {
    if (err) {
      log.error('Error starting the app', { error: err });
      process.exit(-1);
    }

    await start();

    log.info(`${config.app} is running on ${config.port}`);
  });
};

exports.app = app;
