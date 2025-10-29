import express from "express";
import type { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authentication.js";
import pool from "../db.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateLocation,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

// Create a new user
router.post("/", async (req: Request, res: Response) => {
  createUser(req, res);
});
// Get all users
router.get("/", async (req: Request, res: Response) => {
  getAllUsers(req, res);
});

// Get a user by ID
router.get("/:id", async (req: Request, res: Response) => {
  getUserById(req, res);
});

router.put("/location:id", async (req: Request, res: Response) => {
  updateLocation(req, res);
});

// Update a user
router.put("/:id", async (req: Request, res: Response) => {
  updateUser(req, res);
});

// Delete a user
router.delete("/:id", async (req: Request, res: Response) => {
  deleteUser(req, res);
});

export default router;
