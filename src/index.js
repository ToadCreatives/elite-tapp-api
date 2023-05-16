const app = require('./services/express');

// start app and connect to database
app.start();

module.exports = app;
