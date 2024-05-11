const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('size_types', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country_key: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    country_name_UA: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'size_types',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "country_key",
        unique: true,
        fields: [
          { name: "country_key" },
        ]
      },
      {
        name: "country_name_UA",
        unique: true,
        fields: [
          { name: "country_name_UA" },
        ]
      },
      {
        name: "primary00004",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
