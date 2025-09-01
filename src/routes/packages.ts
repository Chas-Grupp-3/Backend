import express, { Request, Response } from "express";
import { Package } from "../types/packages";

const router = express.Router();

let packages: Package[] = [];
router.get("/"),
  (res: Response) => {
    res.json(packages);
  };

// Get a package by ID pkg === package
router.get("/:id", (req: Request, res: Response) => {
  const pkg = packages.find((p) => p.id === req.params.id);
  if (pkg) {
    res.json(pkg);
  } else {
    res.status(404).send("Package not found");
  }
});

// Create a new package
router.post("/", (req: Request, res: Response) => {
  const newPackage: Package = req.body as Package;
  packages.push(newPackage);
  res.status(201).json(newPackage);
});

// Update a package
router.put("/:id", (req: Request, res: Response) => {
  const index = packages.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    packages[index] = { ...packages[index], ...req.body };
    res.json(packages[index]);
  } else {
    res.status(404).send("Package not found");
  }
});

// Delete a package
router.delete("/:id", (req: Request, res: Response) => {
  const index = packages.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    packages.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Package not found");
  }
});
