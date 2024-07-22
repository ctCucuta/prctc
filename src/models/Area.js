const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Area = sequelize.define('area', {
    name: {
        type: DataTypes.STRING
    },

})

module.exports = Area;
