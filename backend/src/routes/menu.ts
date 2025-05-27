import express from "express";
import { getMenuItems } from "../controllers/menuController";

const router = express.Router();

router.get("/", getMenuItems);

export default router;
