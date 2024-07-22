const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');


const ResponseFile = sequelize.define('responsefile',{
    url:{
        type: DataTypes.STRING
    },
    filename: {
        type:DataTypes.STRING
    },
    

});


module.exports = ResponseFile;