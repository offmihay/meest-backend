const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('system_conversions', {
    conversion_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body_part: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    size_system: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'system_conversions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "system_conversions_pk",
        unique: true,
        fields: [
          { name: "body_part" },
          { name: "size_system" },
          { name: "conversion_group" },
        ]
      },
    ]
  });
};
