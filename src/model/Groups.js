const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CommitteeGroup = sequelize.define('CommitteeGroup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    groupName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'group_name'
    },
    memberSecretary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'member_secretary'
    }
  }, {
    tableName: 'committee_groups',
    timestamps: true,
    underscored: true
  });

  CommitteeGroup.associate = (models) => {
    CommitteeGroup.belongsTo(models.User, {
      foreignKey: 'memberSecretary',
      as: 'secretary'
    });

    CommitteeGroup.belongsToMany(models.User, {
      through: 'committee_group_members',
      foreignKey: 'committee_group_id',
      otherKey: 'user_id',
      as: 'members'
    });
  };

  return CommitteeGroup;
};