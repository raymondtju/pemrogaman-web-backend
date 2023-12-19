import express from "express";

import seq from "./db/sequelize.js";
import { member } from "./model/index.js";

member.sync();

// express app and its middlewares
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(seq.authenticate());
});

app.get("/api/members", async (_req, res) => {
  const members = await member.findAll();
  res.json({
    status: 200,
    error: null,
    data: members,
  });
});

app.post("/api/members", async (req, res) => {
  const { name, password, active } = req.body;
  const newMember = await member.create({
    name,
    password,
    active,
  });
  res.json({
    status: 200,
    error: null,
    data: newMember,
  });
});

app.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const { name, password, active } = req.body;
  const updatedMember = await member.update(
    {
      name,
      password,
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

app.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
