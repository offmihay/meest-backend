const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clothes_data', {
    uniq_cloth_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cloth_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clothes',
        key: 'id'
      }
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genders',
        key: 'id'
      }
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'clothes_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clothes_data_brands_id_fk",
        fields: [
          { name: "brand_id" },
        ]
      },
      {
        name: "clothes_data_clothes_definition_id_fk",
        fields: [
          { name: "cloth_id" },
        ]
      },
      {
        name: "clothes_data_genders_id_fk",
        fields: [
          { name: "gender_id" },
        ]
      },
      {
        name: "primary00001",
        unique: true,
        fields: [
          { name: "uniq_cloth_id" },
        ]
      },
    ]
  });
};
