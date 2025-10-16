import pool from "../db.js";
import type { Request, Response } from "express";
import type { Package } from "../types/packages.js";

export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query<Package>("SELECT * FROM packages");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query<Package>(
      "SELECT * FROM packages WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).send("Package not found");
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error getting package:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const newPackage: Package = req.body;
    // Adjust columns and values depending on your schema
    const columns = Object.keys(newPackage).join(", ");
    const values = Object.values(newPackage);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO packages (${columns}) VALUES (${placeholders}) RETURNING *`;
    const { rows } = await pool.query<Package>(query, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const updateData: Partial<Package> = req.body;
    const keys = Object.keys(updateData);
    if (keys.length === 0) {
      return res.status(400).send("No data to update");
    }

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const values = Object.values(updateData);
    values.push(req.params.id); // for WHERE clause

    const query = `UPDATE packages SET ${setClause} WHERE id = $${values.length} RETURNING *`;

    const { rows } = await pool.query<Package>(query, values);

    if (rows.length === 0) {
      return res.status(404).send("Package not found");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM packages WHERE id = $1",
      [req.params.id]
    );
    if (rowCount === 0) {
      return res.status(404).send("Package not found");
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).send("Internal Server Error");
  }
};
