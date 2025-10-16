import express from "express";
import { authenticateToken } from "../middlewares/authentication.js";
const router = express.Router();
let users = [];
// Get all users
router.get("/", authenticateToken, (req, res) => {
    res.json(users);
});
// Get a user by ID
router.get("/:id", authenticateToken, (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
});
// Create a new user
router.post("/", authenticateToken, (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});
// Update a user
router.put("/:id", authenticateToken, (req, res) => {
    const index = users.findIndex((u) => u.id === req.params.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.json(users[index]);
    }
    else {
        res.status(404).send("User not found");
    }
});
// Delete a user
router.delete("/:id", authenticateToken, (req, res) => {
    const index = users.findIndex((u) => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send("User not found");
    }
});
export default router;
