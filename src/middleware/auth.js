import jwt from "jsonwebtoken";
import { AUTH_SECRET_KEY } from "../config.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Please authenticate." });
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default authMiddleware;
