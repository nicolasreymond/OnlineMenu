import { Request, Response } from "express";
import { pool } from "../db";
import { MenuItem, MenuItemInput } from "../types/menu";
import { Category } from "../types/category";

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const categoriesResult = await pool.query<Category>("SELECT * FROM categories");
    const categories = categoriesResult.rows;
    const itemsResult = await pool.query<MenuItem>("SELECT * FROM menu_items");
    const items = itemsResult.rows;
    const groupedMenuItems = categories.map((category) => ({
      ...category,
      items: items.filter((item: MenuItem) => item.category_id === category.id),
    }));
    res.json(groupedMenuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query<MenuItem>("SELECT * FROM menu_items WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  const { name, price, abv, description, image_url, category_id } = req.body as MenuItemInput;
  try {
    const result = await pool.query<MenuItem>(
      "INSERT INTO menu_items (name, price, abv, description, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, price, abv, description, image_url, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, price, abv, description, image_url, category_id } = req.body as MenuItemInput;
  try {
    const result = await pool.query<MenuItem>(
      "UPDATE menu_items SET name=$1, price=$2, abv=$3, description=$4, image_url=$5, category_id=$6 WHERE id=$7 RETURNING *",
      [name, price, abv, description, image_url, category_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query<MenuItem>("DELETE FROM menu_items WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json({ message: "Menu item deleted", item: result.rows[0] });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Category>("SELECT * FROM categories");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
