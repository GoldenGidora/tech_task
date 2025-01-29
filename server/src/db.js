const pgp = require('pg-promise')();
require('dotenv').config();

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const db = pgp(connectionString);

module.exports = { db };
