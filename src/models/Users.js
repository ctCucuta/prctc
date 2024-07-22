const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Area = require('./Area');

const Users = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,

    },
    email: {
        type: DataTypes.STRING,

    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM(['admin', 'user']),
        allowNull: false,
        defaultValue: 'user',
    },

})

Users.belongsTo(Area);

module.exports = Users;