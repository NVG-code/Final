import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all reviews
router.get("/", async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.json(reviews);
});

// Create a new review
router.post("/", async (req, res) => {
  const review = await prisma.review.create({
    data: req.body,
  });
  res.status(201).json(review);
});

// Get, update, or delete a review by ID
router
  .route("/:id")
  .get(async (req, res) => {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id },
    });
    if (review) {
      res.json(review);
    } else {
      res.status(404).send("Review not found");
    }
  })
  .put(async (req, res) => {
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(review);
  })
  .delete(async (req, res) => {
    await prisma.review.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  });

export default router;
