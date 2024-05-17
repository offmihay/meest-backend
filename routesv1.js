const express = require("express");
require("express-async-errors");
const router = express.Router();
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error_handler");
const authorizationHandler = require("./middlewares/authorization_handler");

const sequelize = require("./db_connection");
const initModels = require("./models/init-models");
const models = initModels(sequelize);

const cors = require("cors");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const allBrandsHandler = require("./handlers/all_brands");
const brandsHandler = require("./handlers/brands");
const clothesHandler = require("./handlers/clothes");
const loginHandler = require("./handlers/login");
const allUsersHandler = require("./handlers/all-users");
const sizeHandler = require('./handlers/size')

router.get("/all-brands", (req, res, next) =>
  allBrandsHandler(req, res, next, models)
);
router.get("/brands", (req, res, next) =>
  brandsHandler(req, res, next, models)
);
router.get("/clothes", (req, res, next) =>
  clothesHandler(req, res, next, models)
);
router.post("/login", (req, res, next) => loginHandler(req, res, next, models));

router.get("/all-users", authorizationHandler(models), (req, res, next) =>
  allUsersHandler(req, res, next, models)
);
router.post("/calculate-size", (req, res, next) =>
  sizeHandler(req, res, next, models)
);


router.use(errorHandler);

module.exports = router;
