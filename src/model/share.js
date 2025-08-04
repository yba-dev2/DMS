const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Share = sequelize.define('Share', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'file_id'
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'folder_id'
    },
    sharedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shared_by'
    },
    shareToAll: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'share_to_all'
    },
    sharedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'shared_at'
    }
  }, {
    tableName: 'shares',
    timestamps: false,
    underscored: true
  });

  Share.associate = (models) => {
    Share.belongsTo(models.File, {
      foreignKey: 'fileId',
      as: 'file',
      onDelete: 'NO ACTION' // ✅ important
    });

    Share.belongsTo(models.Folder, {
      foreignKey: 'folderId',
      as: 'folder',
      onDelete: 'NO ACTION' // ✅ important
    });

    Share.belongsTo(models.User, {
      foreignKey: 'sharedBy',
      as: 'sharer',
      onDelete: 'NO ACTION' // optional, but matches your DB schema
    });

    Share.hasMany(models.SharedWith, {
      foreignKey: 'shareId',
      as: 'sharedWith'
    });

    Share.hasMany(models.DownloadedBy, {
      foreignKey: 'shareId',
      as: 'downloadedBy'
    });
  };

  return Share;
};
