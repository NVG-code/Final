import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all hosts
router.get("/", async (req, res) => {
  const hosts = await prisma.host.findMany();
  res.json(hosts);
});

// Create a new host
router.post("/", async (req, res) => {
  const host = await prisma.host.create({
    data: req.body,
  });
  res.status(201).json(host);
});

// Get, update, or delete a host by ID
router
  .route("/:id")
  .get(async (req, res) => {
    const host = await prisma.host.findUnique({
      where: { id: req.params.id },
    });
    if (host) {
      res.json(host);
    } else {
      res.status(404).send("Host not found");
    }
  })
  .put(async (req, res) => {
    const host = await prisma.host.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(host);
  })
  .delete(async (req, res) => {
    await prisma.host.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  });

export default router;
