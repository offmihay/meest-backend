const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: process.env.DATABASE_SSL === "true",
        // disable SSL certificate validation temporarily
        rejectUnauthorized: false,
      },
    },
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    waitForConnections: process.env.DATABASE_WAITFORCONNECTIONS === "true", // Перетворення рядка в логічне значення
    connectionLimit: parseInt(process.env.DATABASE_CONNECTIONLIMIT),
    queueLimit: parseInt(process.env.DATABASE_QUEUELIMIT),
    pool: {
      max: 10,
      min: 1,
    },
  }
);

module.exports = sequelize;
