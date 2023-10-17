// 221111452 - Raymond Tju

import http from "http";
import fs from "fs";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  fs.readFile("./index.html", {}, (err, data) => {
    if (err) console.log(err);

    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
