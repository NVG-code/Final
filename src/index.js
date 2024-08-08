import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware/auth.js";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import hostsRouter from "./routes/hosts.js";
import amenitiesRouter from "./routes/amenities.js";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Routes
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
