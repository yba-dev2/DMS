const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    originalname: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    mimetype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'uploaded_by'
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: true, // allow null now since files might be uploaded directly to CreateFolder
      references: {
        model: 'folders',
        key: 'id'
      },
      field: 'folder_id'
    },
    linkedFolder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'create_folders',
        key: 'id'
      },
      field: 'linked_folder'
    }
  }, {
    tableName: 'files',
    timestamps: false,
    underscored: true
  });

  File.associate = (models) => {
    File.belongsTo(models.Folder, {
      foreignKey: 'folderId',
      as: 'folder'
    });

    File.belongsTo(models.User, {
      foreignKey: 'uploadedBy',
      as: 'uploader'
    });

    File.belongsTo(models.CreateFolder, {
      foreignKey: 'linkedFolder',
      as: 'linkedFolderRef'
    });
  };

  return File;
};
