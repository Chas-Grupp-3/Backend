import express from "express";
import type { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authentication.js";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  markAsDelivered,
  updatePackage,
} from "../controllers/packages.js";

const router = express.Router();

// Get all
router.get("/", async (req: Request, res: Response) => {
  getAllPackages(req, res);
});

// Get a package by ID
router.get("/:id", async (req: Request, res: Response) => {
  getPackageById(req, res);
});

// Create a new package
router.post("/", async (req: Request, res: Response) => {
  createPackage(req, res);
});

// Update a package
router.put("/:id", async (req: Request, res: Response) => {
  updatePackage(req, res);
});

// Update a package frontend
router.put("/delivered:id", async (req: Request, res: Response) => {
  markAsDelivered(req, res);
});

//create update location route
//add delivered date
//rewrite part of the API code and make a easy dashboard?

// Delete a package
router.delete("/:id", async (req: Request, res: Response) => {
  deletePackage(req, res);
});

export default router;
