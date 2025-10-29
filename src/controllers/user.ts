import pool from "../db.js";
import type { Request, Response } from "express";
import type { User } from "../types/user.js";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query<User>(
      "SELECT id, name, email, role FROM users"
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const { rows } = await pool.query<User>(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = { id: uuidv4(), ...req.body };
    const columns = Object.keys(newUser).join(", ");
    const values = Object.values(newUser);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *`;
    const { rows } = await pool.query<User>(query, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updateData: Partial<User> = req.body;
    const keys = Object.keys(updateData);

    if (keys.length === 0) {
      return res.status(400).send("No data to update");
    }

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const values = Object.values(updateData);
    values.push(req.params.id); // Add id param for WHERE clause

    const query = `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    const { rows } = await pool.query<User>(query, values);

    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const location = req.body;
    console.log("location:", location);
    console.log("userId:", userId);

    const { rows } = await pool.query<User>(
      "UPDATE drivers SET location = $1 WHERE driver_uuid = $2 RETURNING location",
      [location, userId]
    );

    if (rows.length === 0) {
      return res.status(404).send("location not updated");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      req.params.id,
    ]);

    if (rowCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};
