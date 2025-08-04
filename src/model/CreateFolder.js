const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CreateFolder = sequelize.define('CreateFolder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    folderName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'folder_name'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'created_by'
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    path: {
      type: DataTypes.STRING(500),  // Longer path for file systems
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    tableName: 'create_folders',
    timestamps: false,
    underscored: true
  });

  CreateFolder.associate = (models) => {
    CreateFolder.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  };

  return CreateFolder;
};