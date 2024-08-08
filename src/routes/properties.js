import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all properties
router.get("/", async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

// Create a new property
router.post("/", async (req, res) => {
  const property = await prisma.property.create({
    data: req.body,
  });
  res.status(201).json(property);
});

// Get, update, or delete a property by ID
router
  .route("/:id")
  .get(async (req, res) => {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });
    if (property) {
      res.json(property);
    } else {
      res.status(404).send("Property not found");
    }
  })
  .put(async (req, res) => {
    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(property);
  })
  .delete(async (req, res) => {
    await prisma.property.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  });

export default router;
