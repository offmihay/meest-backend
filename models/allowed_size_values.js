const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('allowed_size_values', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "allowed_size_values_value_key"
    }
  }, {
    sequelize,
    tableName: 'allowed_size_values',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "allowed_size_values_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "allowed_size_values_value_key",
        unique: true,
        fields: [
          { name: "value" },
        ]
      },
    ]
  });
};
