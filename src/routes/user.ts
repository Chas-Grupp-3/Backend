import express, { Request, Response } from "express";
import { User } from "../types/users";

const router = express.Router();

let users: User[] = [];

// Get all users
router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

// Get a user by ID
router.get("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Create a new user
router.post("/", (req: Request, res: Response) => {
  const newUser: User = req.body as User;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
router.put("/:id", (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).send("User not found");
  }
});

// Delete a user
router.delete("/:id", (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});

export default router;
