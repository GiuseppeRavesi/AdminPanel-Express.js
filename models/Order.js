const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    total_products: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    placed_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    payment_status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });
  
  module.exports = Order;