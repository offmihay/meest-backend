var DataTypes = require("sequelize").DataTypes;
var _brands = require("./brands");
var _clothes = require("./clothes");
var _clothes_data = require("./clothes_data");
var _conversions = require("./conversions");
var _genders = require("./genders");
var _size_types = require("./size_types");
var _users = require("./users");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);
  var clothes = _clothes(sequelize, DataTypes);
  var clothes_data = _clothes_data(sequelize, DataTypes);
  var conversions = _conversions(sequelize, DataTypes);
  var genders = _genders(sequelize, DataTypes);
  var size_types = _size_types(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    brands,
    clothes,
    clothes_data,
    conversions,
    genders,
    size_types,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
