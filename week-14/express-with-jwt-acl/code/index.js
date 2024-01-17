import express from "express";

import session from "express-session";
import acl from "express-acl";

import { member } from "./model/index.js";
import RootRouter from "./routers/root.js";
import AdminRouter from "./routers/admin.js";
import {
  authUserMiddleware,
  passMiddleware,
} from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
// import { permit } from "./controller/auth.js";

member.sync();

// express app and its middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
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

acl.config({
  filename: "acl.json",
  baseUrl: "/",
  defaultRole: "regular",
  denyCallback: (res) => {
    res.render("forbidden");
  },
});
app.use(passMiddleware);
app.use(acl.authorize.unless({ path: ["/", "/login", "/logout"] }));

app.use("/", RootRouter);
app.use("/admin", AdminRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
