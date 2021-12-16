const knex = require('knex');

const config = require('../knexfile');

const { NODE_ENV } = require('../config');

const environment = NODE_ENV;

module.exports = knex(config[environment]);
