import express from "express";
import type { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authentication.js";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  getPackageByUserId,
  markAsDelivered,
  updatePackage,
} from "../controllers/packages.js";

const router = express.Router();

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *       401:
 *         description: Unauthorized
 */
router.get("/", async (req: Request, res: Response) => {
  getAllPackages(req, res);
});

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     summary: Get packages by user ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of packages for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No packages found for this user
 */
router.get("/:id", async (req: Request, res: Response) => {
  getPackageByUserId(req, res);
});

/**
 * @swagger
 * /packages/package{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.get("/package/:id", async (req: Request, res: Response) => {
  getPackageById(req, res);
});

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageInput'
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", async (req: Request, res: Response) => {
  createPackage(req, res);
});

/**
 * @swagger
 * /packages/{id}:
 *   put:
 *     summary: Update a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageInput'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.put("/:id", async (req: Request, res: Response) => {
  updatePackage(req, res);
});

/**
 * @swagger
 * /packages/delivered{id}:
 *   put:
 *     summary: Mark a package as delivered
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package marked as delivered
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.put("/delivered/:id", async (req: Request, res: Response) => {
  markAsDelivered(req, res);
});

/**
 * @swagger
 * /packages/{id}:
 *   delete:
 *     summary: Delete a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
  deletePackage(req, res);
});

export default router;
