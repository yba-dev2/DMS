
const { Sequelize } = require('sequelize');

// SQL Server connection configuration
const sequelize = new Sequelize('DMS', 'sa', 'p1ne@pple', {
  host: '172.16.16.188',
  dialect: 'mssql',
  port: 4433,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  },
  logging: false, // Set to false to disable logging
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import all models
const User = require('../model/users')(sequelize);
const CreateFolder = require('../model/CreateFolder')(sequelize);
const Folder = require('../model/Folder')(sequelize);
const File = require('../model/File')(sequelize);
const CommitteeGroup = require('../model/Groups')(sequelize);
const Share = require('../model/Share')(sequelize);
const SharedWith = require('../model/SharedWith')(sequelize);
const DownloadedBy = require('../model/DownloadBy')(sequelize);

// Store models in db object
const db = {
  sequelize,
  Sequelize,
  User,
  CreateFolder,
  Folder,
  File,
  CommitteeGroup,
  Share,
  SharedWith,
  DownloadedBy
};

// Initialize associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;