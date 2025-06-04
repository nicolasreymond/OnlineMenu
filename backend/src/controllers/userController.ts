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
  const { username, email, passwordHash } = req.body;
  try {
    // insert new user into the database
    pool.query(
      "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
      [username, passwordHash, email],
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
  const { username, email, passwordHash } = req.body;
  try {
    // update user in the database
    pool.query(
      "UPDATE users SET username = $1, password_hash = $2, email = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [username, passwordHash, email, userId],
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
  const userId = req.params.id;
  try {
    pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({
          message: "User deleted successfully",
          user: results.rows[0],
        });
      }
    );
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
