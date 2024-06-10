const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('system_categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "system_categories_key_key"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'system_categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "system_categories_key_key",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
      {
        name: "system_categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
