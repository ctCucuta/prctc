const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');


const TipesIdentity = sequelize.define('tipesidentity',{
    tipeDocument:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
});

module.exports= TipesIdentity;