const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');

const PqrType = sequelize.define('PqrType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    timestamps: false 
  });
  
  module.exports = PqrType;
  
  