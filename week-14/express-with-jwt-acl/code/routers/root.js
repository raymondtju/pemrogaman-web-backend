import express from "express";
import * as memberController from "../controller/member.js";
import { authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.decoded;

  res.render("index", {
    user: req.session.user || user,
  });
});

router.get("/login", memberController.login);
router.get("/logout", memberController.logout);
router.post("/login", memberController.auth);

export default router;
