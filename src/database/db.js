// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const { DB_HOST, DB_NAME, DB_DATABASE, DB_PASSWORD } = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_DATABASE, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: 'postgres'
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectTimeout: 30000, // 30 segundos
  },
});

module.exports = sequelize;
