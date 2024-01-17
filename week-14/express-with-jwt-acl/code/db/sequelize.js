import sequelize from "sequelize";

const seq = new sequelize("week12-express-orm", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

export default seq;
