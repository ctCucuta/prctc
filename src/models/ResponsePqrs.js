const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Pqrs = require('./Pqrs');
const ResponseFile = require('./ResponseFile');




const ResponsePqrs = sequelize.define('responsePqrs', {
    respuesta: {
        type: DataTypes.STRING,
    },
});
ResponsePqrs.belongsTo(Pqrs);
ResponsePqrs.hasMany(ResponseFile, { as: 'responseFiles' }); 

module.exports = ResponsePqrs;