const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conversions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uniq_cloth_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.REAL,
      allowNull: true
    },
    head_length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    chest_length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    waist_length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    hip_length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    foot_length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    pants_length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    size_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    size_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'conversions',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "conversions_clothes_data_uniq_cloth_id_fk",
        fields: [
          { name: "uniq_cloth_id" },
        ]
      },
      {
        name: "conversions_size_types_id_fk",
        fields: [
          { name: "size_type_id" },
        ]
      },
      {
        name: "primary00002",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
