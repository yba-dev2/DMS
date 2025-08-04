const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SharedWith = sequelize.define('SharedWith', {
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
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'committee_groups',
        key: 'id'
      },
      field: 'group_id'
    },
    access: {
      type: DataTypes.STRING(20),  // Changed from ENUM to STRING
      allowNull: false,
      defaultValue: 'read',
      validate: {
        isIn: [['read', 'write', 'NoDownload']]  // App-level validation
      }
    },
    sharedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'shared_at'
    }
  }, {
    tableName: 'shared_with',
    timestamps: false,
    underscored: true
  });

  SharedWith.associate = (models) => {
    SharedWith.belongsTo(models.Share, {
      foreignKey: 'shareId',
      as: 'share'
    });

    SharedWith.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    SharedWith.belongsTo(models.CommitteeGroup, {
      foreignKey: 'groupId',
      as: 'group'
    });
  };

  return SharedWith;
};