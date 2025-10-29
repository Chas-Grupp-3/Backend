import pool from "../db.js";
import type { Request, Response } from "express";
import type { Package } from "../types/packages.js";
import { User } from "../types/user.js";

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
    const { rows } = await pool.query<User>(
      "SELECT * FROM packages WHERE package_id = $1",
      [req.params.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error getting package:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getPackageByUserId = async (req: Request, res: Response) => {
  try {
    //Gets role from the specified id
    const data = await pool.query<User>(
      "SELECT role FROM users WHERE id = $1",
      [req.params.id]
    );

    const user = data.rows[0];
    //Function to be able to get packages based on role of userid
    async function getPackagesByRole(
      userId: string,
      role: "driver" | "user" | "admin"
    ) {
      const column = role === "driver" ? "driver_id" : "receiver_id";

      const query = `SELECT * FROM packages WHERE ${column} = $1`;

      const { rows } = await pool.query<Package>(query, [userId]);

      return rows;
    }
    const packages = await getPackagesByRole(req.params.id, user.role);
    console.log(packages);
    res.json(packages.map((pkg) => ({ ...pkg }))); // ensures plain JSON
  } catch (error) {
    console.error("Error getting package:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const newPackage = req.body;

    // Define the columns you want to insert
    const columns = [
      "location",
      "temperature",
      "sender",
      "date",
      "humidity",
      "delivered",
      "receiver_id",
      "driver_id",
      "arrival_date",
      "destination",
    ];

    // Build an array with values in the same order as columns
    const values = [
      newPackage.location,
      newPackage.temperature ?? null,
      newPackage.sender,
      newPackage.date ?? new Date(),
      newPackage.humidity ?? null,
      newPackage.delivered ?? null,
      newPackage.arrival_date ?? null,
      newPackage.destination ?? null,
      newPackage.driver_id ?? null,
      newPackage.receiver_id ?? null,
    ];

    // Generate placeholders like $1, $2, $3...
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO packages (${columns.join(
      ", "
    )}) VALUES (${placeholders}) RETURNING *`;

    const { rows } = await pool.query<Package>(query, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { date, temperature, humidity, location } = req.body;
    const packageId = req.params.id;

    const columnsToUpdate: string[] = [];
    const values: any[] = [];

    if (date !== undefined) {
      columnsToUpdate.push(`date = $${columnsToUpdate.length + 1}`);
      values.push(date);
    }
    if (temperature !== undefined) {
      columnsToUpdate.push(`temperature = $${columnsToUpdate.length + 1}`);
      values.push(temperature);
    }
    if (humidity !== undefined) {
      columnsToUpdate.push(`humidity = $${columnsToUpdate.length + 1}`);
      values.push(humidity);
    }
    if (location !== undefined) {
      columnsToUpdate.push(`location = $${columnsToUpdate.length + 1}`);
      values.push(location);
    }

    if (columnsToUpdate.length === 0) {
      return res.status(400).send("No valid fields to update");
    }

    values.push(packageId);

    const query = `UPDATE packages SET ${columnsToUpdate.join(
      ", "
    )} WHERE package_id = $${values.length} RETURNING *`;

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

export const markAsDelivered = async (req: Request, res: Response) => {
  try {
    const packageId = req.params.id;

    const query = `
  UPDATE packages
  SET delivered = true
  WHERE id = $1
  RETURNING *
`;

    const { rows } = await pool.query<Package>(query, [packageId]);

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
