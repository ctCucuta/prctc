const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');
const moment = require('moment');


const Storages = sequelize.define('storages',{
    url:{
        type: DataTypes.STRING
    },
    filename: {
        type:DataTypes.STRING
    },
    

});
Storages.beforeCreate(async (storage, options) => {
    // Genera un nombre de archivo único con la fecha y hora actual
    const timestamp = moment().format('YYYYMMDDHHmmss');
    // Agrega un sufijo aleatorio para evitar conflictos si se suben múltiples archivos en el mismo segundo
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const uniqueFilename = `${timestamp}_${randomSuffix}`;
    // Asigna el nombre de archivo único al registro
    storage.filename = uniqueFilename;
});

module.exports = Storages;