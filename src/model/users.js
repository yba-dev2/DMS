// models/User.js - SQL Server Compatible
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true  // Uses IDENTITY(1,1) in SQL Server
    },
    employeeId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'employee_id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    employeeCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'employee_code'
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return User;
};