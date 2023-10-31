import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "be-week07",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected!");
  }
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/users", (_req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM users WHERE user_id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
