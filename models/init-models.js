var DataTypes = require("sequelize").DataTypes;
var _allowed_size_values = require("./allowed_size_values");
var _brands = require("./brands");
var _clothes = require("./clothes");
var _clothes_data = require("./clothes_data");
var _conversions = require("./conversions");
var _genders = require("./genders");
var _size_systems = require("./size_systems");
var _system_conversions = require("./system_conversions");
var _users = require("./users");

function initModels(sequelize) {
  var allowed_size_values = _allowed_size_values(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var clothes = _clothes(sequelize, DataTypes);
  var clothes_data = _clothes_data(sequelize, DataTypes);
  var conversions = _conversions(sequelize, DataTypes);
  var genders = _genders(sequelize, DataTypes);
  var size_systems = _size_systems(sequelize, DataTypes);
  var system_conversions = _system_conversions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    allowed_size_values,
    brands,
    clothes,
    clothes_data,
    conversions,
    genders,
    size_systems,
    system_conversions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
