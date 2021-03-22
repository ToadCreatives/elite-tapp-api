const Knex = require('knex');

module.exports = Knex.knex({ client: 'pg' });
