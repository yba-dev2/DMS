
const { Sequelize } = require('sequelize');
require('dotenv').config();
// SQL Server connection configuration

const sequelize = new Sequelize(
  process.env.DB_NAME_MSSQL,
  process.env.DB_USER_MSSQL,
  process.env.DB_PASS_MSSQL,
  {
    host: process.env.DB_HOST_MSSQL,
    dialect: 'mssql',
    port: process.env.DB_PORT_MSSQL,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    },
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

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