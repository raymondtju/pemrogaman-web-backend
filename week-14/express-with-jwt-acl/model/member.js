import seq from "../db/sequelize.js";
import sequelize from "sequelize";

const member = seq.define("member", {
  name: sequelize.STRING,
  password: sequelize.STRING,
  active: sequelize.BOOLEAN,
  role: sequelize.STRING,
});

export default member;
