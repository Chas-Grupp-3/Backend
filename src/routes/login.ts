import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";
import pool from "../db.js"; // Adjust import to your pool instance
import { User } from "../types/user.js";

const router = express.Router();

const allowedRoles = ["admin", "user", "driver"];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user, driver]
 *                 default: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role
 *       409:
 *         description: Email already registered
 */
router.post(
  "/register",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, role }: User = req.body;
    console.log(req.body);
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}.`,
      });
    }

    // Check if user exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Hash password and insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role",
      [email, hashedPassword, name, role || "user"]
    );

    const newUser = result.rows[0];
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  })
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 id:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    // Find user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const dbUser = result.rows[0];

    if (!dbUser) {
      return res.status(401).json({ message: "Could not find user" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      id: dbUser.id,
      role: dbUser.role,
    });
  })
);

export default router;
