const Sequelize = require('sequelize');
let sequelize = require('./sequelize');

let District = sequelize.define(
    'district',
    {
      name: Sequelize.STRING,
      index: Sequelize.INTEGER
    },
    {
      tableName: 'district'
    }
);

module.exports = District;

