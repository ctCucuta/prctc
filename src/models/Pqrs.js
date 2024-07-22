const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');
const PqrType = require('./PqrsType');
const TipesIdentity = require('./TipesIdentity');
const Storages = require('./Storage');
const ResponseFile = require('./ResponseFile');




const Pqrs = sequelize.define('pqrs',{
    name:{
        type:DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    identity:{
        type:DataTypes.INTEGER
    },
    phone:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    consecutive:{
        type: DataTypes.STRING,
    
    },
    state: {
        type: DataTypes.ENUM('Abierto', 'Tramite', 'Cerrada'),
        allowNull: false,
        defaultValue: 'Abierto',
    },
    
    
})
Pqrs.belongsToMany(PqrType, { through: 'pqrsfd' });
Pqrs.belongsTo(TipesIdentity, { foreignKey: 'typeDocument' });
Pqrs.hasMany(Storages);
Pqrs.hasMany(ResponseFile);




module.exports = Pqrs;



// Pqrs.TipesIdentity =Pqrs.belongsTo(TipesIdentity);