const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('test DMS', 'sa', '!nf0rm@tioN', {
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  },
  logging: false
});

// Import your User model
const defineUserModel = require('../model/users'); // Adjust path
const User = defineUserModel(sequelize, DataTypes);

async function importFromAPI() {
  try {
    await sequelize.authenticate();
    console.log("✅ MSSQL connection successful.");

    const filePath = path.join(__dirname, './employees.json');
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!Array.isArray(rawData)) {
      throw new Error('JSON must be an array of employee objects');
    }

    // Map snake_case keys to camelCase keys
    const formattedData = rawData.map(emp => ({
      employeeId: emp.employee_id,
      name: emp.name,
      email: emp.email,
      employeeCode: emp.employee_code,
      department: emp.department
    }));

    await User.bulkCreate(formattedData);

    console.log(`✅ Imported ${formattedData.length} employees successfully.`);

    await sequelize.close();
  } catch (err) {
    console.error('❌ Error importing employees:', err);
  }
}

importFromAPI();
