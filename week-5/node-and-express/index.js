// 221111452 - Raymond Tju

import express from "express";

const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.get("/", (_reg, res) => {
  res.send("Hello world, I am Raymond Tju - 221111452");
});
app.get("/routing", (_reg, res) => {
  res.send("Routing route, I am Raymond Tju - 221111452");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
