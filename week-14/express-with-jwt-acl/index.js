import express from "express";

import seq from "./db/sequelize.js";
import { member } from "./model/index.js";
import session from "express-session";
import * as memberController from "./controller/member.js";
import RootRouter from "./routers/root.js";
import AdminRouter from "./routers/admin.js";
import { permit } from "./controller/auth.js";

member.sync();

// express app and its middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.get("/id", (req, res) => {
  res.send(req.sessionID);
});

app.use("/", RootRouter);
app.use("/admin", permit("admin", "special"), AdminRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
