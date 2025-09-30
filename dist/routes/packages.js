import express from "express";
import { authenticateToken } from "../middlewares/authentication.ts";
const router = express.Router();
let packages = [];
router.get("/", (req, res) => {
    res.json(packages);
});
// Get a package by ID pkg === package
router.get("/:id", authenticateToken, (req, res) => {
    const pkg = packages.find((p) => p.id === req.params.id);
    if (pkg) {
        res.json(pkg);
    }
    else {
        res.status(404).send("Package not found");
    }
});
// Create a new package
router.post("/", authenticateToken, (req, res) => {
    const newPackage = req.body;
    packages.push(newPackage);
    res.status(201).json(newPackage);
});
// Update a package
router.put("/:id", authenticateToken, (req, res) => {
    const index = packages.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
        packages[index] = { ...packages[index], ...req.body };
        res.json(packages[index]);
    }
    else {
        res.status(404).send("Package not found");
    }
});
// Delete a package
router.delete("/:id", authenticateToken, (req, res) => {
    const index = packages.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
        packages.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send("Package not found");
    }
});
export default router;
