const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DownloadedBy = sequelize.define('DownloadedBy', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shareId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shares',
        key: 'id'
      },
      field: 'share_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    downloadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'downloaded_at'
    }
  }, {
    tableName: 'downloaded_by',
    timestamps: false,
    underscored: true
  });

  DownloadedBy.associate = (models) => {
    DownloadedBy.belongsTo(models.Share, {
      foreignKey: 'shareId',
      as: 'share'
    });

    DownloadedBy.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return DownloadedBy;
};
