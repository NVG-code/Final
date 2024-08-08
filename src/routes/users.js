import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create a new user
router.post("/", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(201).json(user);
});

// Get, update, or delete a user by ID
router
  .route("/:id")
  .get(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  })
  .put(async (req, res) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(user);
  })
  .delete(async (req, res) => {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  });

export default router;
