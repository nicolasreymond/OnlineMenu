import { Request, Response } from "express";
import { pool } from "../db";
import { MenuItem } from "../types/menu";
import { Category } from "../types/category";

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    // Fetch all menu categories from the database
    const categoriesResult = await pool.query<Category>(
      "SELECT * FROM categories"
    );
    const categories = categoriesResult.rows;
    // Fetch all menu items from the database
    const itemsResult = await pool.query<MenuItem>("SELECT * FROM menu_items");
    const items = itemsResult.rows;
    // group menu items by category
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
