const express = require("express");
require("express-async-errors");
const router = express.Router();
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error_handler");
const allBrandsHandler = require("./handlers/all_brands");
const brandsHandler = require("./handlers/brands");
const clothesHandler = require("./handlers/clothes");

const sequelize = require("./db_connection");
const initModels = require("./models/init-models");
const models = initModels(sequelize);

const cors = require("cors");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/all-brands", (req, res, next) =>
  allBrandsHandler(req, res, next, models)
);
router.get("/brands", (req, res, next) =>
  brandsHandler(req, res, next, models)
);
router.get("/clothes", (req, res, next) =>
  clothesHandler(req, res, next, models)
);

router.use(errorHandler);

module.exports = router;
