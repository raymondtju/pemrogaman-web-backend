import express from "express";
import { member } from "../../model/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const members = await member.findAll();
  res.render("admin/member/index", {
    members: members.filter((member) => {
      if (req.decoded.role === "admin") {
        return member.role === "regular";
      }
    }),
    user: req.session.user || req.decoded,
  });
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
  if (memberToUpdate.role === "admin" || memberToUpdate.role === "special") {
    res.redirect("/admin/member");
    return;
  }
  res.render("admin/member/edit", { memberToUpdate });
});

export default router;
