import express from "express";
import { member } from "../model/index.js";
import AdminMemberRouter from "./admin/member.js";

const router = express.Router();

router.use("/member", AdminMemberRouter);
router.get("/", async (req, res) => {
  res.render("admin/index", {
    user: req.session.user,
  });
});

router.get("/api/members", async (req, res) => {
  const members = await member.findAll();
  console.log(members);
  res.status(200).json({
    status: 200,
    error: null,
    data: members.filter(
      (member) =>
        req.decoded.role === "admin" &&
        (member.role !== "special" || member.role !== "admin")
    ),
  });
});

router.post("/api/members", async (req, res) => {
  const { name, password, active, role } = req.body;
  if (
    req.decoded.role === "admin" &&
    (role === "admin" || role === "special")
  ) {
    res.status(403).json({
      status: 403,
      error: "Unauthorized",
      data: null,
    });
    return;
  }
  const newMember = await member.create({
    name,
    password,
    active,
    role,
  });
  res.json({
    status: 200,
    error: null,
    data: newMember,
  });
});

router.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const { name, password, active } = req.body;
  const findUser = await member.findOne({
    where: {
      id,
    },
  });
  if (
    req.decoded.role === "admin" &&
    (findUser.role === "admin" || findUser.role === "special")
  ) {
    res.status(403).json({
      status: 403,
      error: "Unauthorized",
      data: null,
    });
    return;
  }
  const updatedMember = await member.update(
    {
      name,
      password: "123",
      active,
    },
    {
      where: {
        id,
      },
    }
  );
  res.json({
    status: 200,
    error: null,
    data: updatedMember,
  });
});

router.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const findUser = await member.findOne({
    where: {
      id,
    },
  });
  if (
    req.decoded.role === "admin" &&
    (findUser.role === "admin" || findUser.role === "special")
  ) {
    res.status(403).json({
      status: 403,
      error: "Unauthorized",
      data: null,
    });
    return;
  }
  const deletedMember = await member.destroy({
    where: {
      id,
    },
  });
  res.json({
    status: 200,
    error: null,
    data: deletedMember,
  });
});

export default router;
