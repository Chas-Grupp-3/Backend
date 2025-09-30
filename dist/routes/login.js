import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
const allowedRoles = ["admin", "user", "driver"];
const db = [];
router.post("/register", asyncHandler(async (req, res) => {
    const { email, password, name, surname, role, } = req.body;
    if (role && !allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Invalid role. Allowed roles are: admin, user, moderator.",
        });
    }
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query("INSERT INTO users (email, password, name, surname, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, surname, role", [email, hashedPassword, name, surname, role || "user"]);
    const newUser = result.rows[0];
    const token = jwt.sign({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({
        message: "User registered successfully",
        token,
        user: newUser,
    });
}));
router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    const dbUser = result.rows[0];
    if (!dbUser) {
        return res.status(401).json({ message: "Invalid login credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid login credentials" });
    }
    const token = jwt.sign({
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
        message: "Login successful",
        token,
        role: dbUser.role,
    });
}));
export default router;
