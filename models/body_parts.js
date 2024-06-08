const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('body_parts', {
    key: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "key"
    }
  }, {
    sequelize,
    tableName: 'body_parts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "key",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
};
