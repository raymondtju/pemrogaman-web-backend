import express from "express";
import { member } from "../../model/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const members = await member.findAll();
  res.render("admin/member/index", { members, user: req.session.user });
});

router.get("/create", (_req, res) => {
  res.render("admin/member/create");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const memberToUpdate = await member.findOne({
    where: {
      id,
    },
  });
  res.render("admin/member/edit", { memberToUpdate });
});

export default router;
