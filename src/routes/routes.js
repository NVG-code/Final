const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/auth");

router.post("/login", async (req, res) => {
  // Inlog logica
});

router.post("/users", authenticate, async (req, res) => {
  // Voeg een nieuwe gebruiker toe
});

router.get("/properties", async (req, res) => {
  const { location, pricePerNight, amenities } = req.query;
  const properties = await prisma.property.findMany({
    where: {
      location: location,
      pricePerNight: parseFloat(pricePerNight),
      amenities: {
        some: {
          name: amenities,
        },
      },
    },
  });
  res.status(200).json(properties);
});

router
  .route("/users/:id")
  .get(async (req, res) => {
    // Retourneer een enkele gebruiker
  })
  .put(authenticate, async (req, res) => {
    // Werk een gebruiker bij
  })
  .delete(authenticate, async (req, res) => {
    // Verwijder een gebruiker
  });

// Herhaal dit patroon voor de overige routes (bookings, properties, reviews, hosts, amenities)

module.exports = router;
