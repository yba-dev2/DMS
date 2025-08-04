const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Folder = sequelize.define('Folder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    folderName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'folder_name'
    },
    uploadType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Folder',
      field: 'upload_type'
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
    tableName: 'folders',
    timestamps: false,
    underscored: true
  });

  Folder.associate = (models) => {
    Folder.hasMany(models.File, {
      foreignKey: 'folderId',
      as: 'files'
    });

    Folder.belongsTo(models.User, {
      foreignKey: 'uploadedBy',
      as: 'uploader'
    });

    Folder.belongsTo(models.CreateFolder, {
      foreignKey: 'linkedFolder',
      as: 'linkedFolderRef'
    });
  };

  return Folder;
};