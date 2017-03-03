const Sequelize = require('sequelize');
let sequelize = require('./sequelize');
const queryInterface = sequelize.getQueryInterface();

queryInterface.createTable(
    'district',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      index: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    },
    {
      engine: 'InnoDB',
      charset: 'utf8'
    }
);