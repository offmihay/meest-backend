const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('system_conversions', {
    conversion_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    system_category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'system_categories',
        key: 'key'
      }
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
          { name: "system_category" },
          { name: "size_system" },
          { name: "conversion_group" },
        ]
      },
    ]
  });
};
