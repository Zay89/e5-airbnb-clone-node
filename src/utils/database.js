const { Sequelize } = require('sequelize');

// Create a connection to database
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'ZayPna89',
  database: 'e5-airbnb-clone-node',
});

module.exports = { db };
