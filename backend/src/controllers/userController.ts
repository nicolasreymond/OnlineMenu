import { Request, Response } from "express";
import { pool } from "../db";
import { User } from "../types/user";

// Get all users
export const getUsers = (req: Request, res: Response) => {
  try {
    // fetch all users from the database
    pool.query<User>("SELECT * FROM users", (error, results) => {
      if (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results.rows);
    });
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a user by ID
export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // fetch user by ID from the database
    pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error fetching user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(results.rows[0]);
      }
    );
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new user
export const createUser = (req: Request, res: Response) => {
  const { email, passwordHash, firstName, lastName, role, isActive } = req.body;
  try {
    // insert new user into the database
    pool.query(
      "INSERT INTO users (email, password_hash, first_name, last_name, role, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, passwordHash, firstName, lastName, role, isActive],
      (error, results) => {
        if (error) {
          console.error("Error creating user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json(results.rows[0]);
      }
    );
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user by ID
export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const { email, passwordHash, firstName, lastName, role, isActive } = req.body;
  try {
    // update user in the database
    pool.query(
      "UPDATE users SET email = $1, password_hash = $2, first_name = $3, last_name = $4, role = $5, is_active = $6 WHERE id = $7 RETURNING *",
      [email, passwordHash, firstName, lastName, role, isActive, userId],
      (error, results) => {
        if (error) {
          console.error("Error updating user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(results.rows[0]);
      }
    );
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user by ID
export const deleteUser = (req: Request, res: Response) => {
  // never delete users, just deactivate them
  const userId = req.params.id;
  try {
    // deactivate user in the database
    pool.query(
      "UPDATE users SET is_active = false WHERE id = $1 RETURNING *",
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error deactivating user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({
          message: "User deactivated successfully",
          user: results.rows[0],
        });
      }
    );
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
