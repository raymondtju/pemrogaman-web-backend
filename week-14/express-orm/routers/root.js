import express from "express";
import * as memberController from "../controller/member.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index", {
    user: req.session.user,
  });
});

router.get("/login", memberController.login);
router.get("/logout", memberController.logout);
router.post("/login", memberController.auth);

export default router;
