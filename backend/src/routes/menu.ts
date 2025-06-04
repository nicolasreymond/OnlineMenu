import express from "express";
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories,
} from "../controllers/menuController";

const router = express.Router();

router.get("/", getMenuItems);
router.get("/categories", getCategories);
router.get("/:id", getMenuItemById);
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
