const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  super:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: 'admin',
  timestamps: false,
});

module.exports = Admin;