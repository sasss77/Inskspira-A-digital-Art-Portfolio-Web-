const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false // Disable SQL query logs for production
  }
);

const db = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Use { force: false } in production!
    console.log("Database connected and synchronized successfully");
  } catch (e) {
    console.error("Failed to connect to database:", e);
  }
};

module.exports = { sequelize, db };

