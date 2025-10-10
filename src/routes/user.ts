import express from "express";
import type { Request, Response } from "express";
import type { User } from "../types/user.js";
import { authenticateToken } from "../middlewares/authentication.js";
import pool from "../db.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

// Get all users
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  getAllUsers(req, res);
});

// Get a user by ID
router.get("/:id", authenticateToken, async (req: Request, res: Response) => {
  getUserById(req, res);
});

// Create a new user
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  createUser(req, res);
});

// Update a user
router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
  updateUser(req, res);
});

// Delete a user
router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    deleteUser(req, res);
  }
);

export default router;
