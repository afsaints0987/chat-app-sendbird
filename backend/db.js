const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "ec2-54-169-182-174.ap-southeast-1.compute.amazonaws.com",
  port: 5432,
  username: "applicant",
  password: "OxzdeuEXBM85=+xQnCV7U",
  database: "FSD_2023_Santos",
  logging: false,
});

module.exports = sequelize;
