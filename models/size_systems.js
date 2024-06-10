const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('size_systems', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    size_system: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    system_category: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'system_categories',
        key: 'key'
      }
    }
  }, {
    sequelize,
    tableName: 'size_systems',
    schema: 'public',
    timestamps: false,
    indexes: [
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
