import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all bookings
router.get("/", async (req, res) => {
  const bookings = await prisma.booking.findMany();
  res.json(bookings);
});

// Create a new booking
router.post("/", async (req, res) => {
  const booking = await prisma.booking.create({
    data: req.body,
  });
  res.status(201).json(booking);
});

// Get, update, or delete a booking by ID
router
  .route("/:id")
  .get(async (req, res) => {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
    });
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).send("Booking not found");
    }
  })
  .put(async (req, res) => {
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(booking);
  })
  .delete(async (req, res) => {
    await prisma.booking.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  });

export default router;
