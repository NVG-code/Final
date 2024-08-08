import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all amenities
router.get("/", async (req, res) => {
  const amenities = await prisma.amenity.findMany();
  res.json(amenities);
});

// Create a new amenity
router.post("/", async (req, res) => {
  const amenity = await prisma.amenity.create({
    data: req.body,
  });
  res.status(201).json(amenity);
});

// Get, update, or delete an amenity by ID
router
  .route("/:id")
  .get(async (req, res) => {
    const amenity = await prisma.amenity.findUnique({
      where: { id: req.params.id },
    });
    if (amenity) {
      res.json(amenity);
    } else {
      res.status(404).send("Amenity not found");
    }
  })
  .put(async (req, res) => {
    const amenity = await prisma.amenity.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(amenity);
  })
  .delete(async (req, res) => {
    await prisma.amenity.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  });

export default router;
