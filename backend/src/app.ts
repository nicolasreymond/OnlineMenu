import express from "express";
import dotenv from "dotenv";
import menuRoutes from "./routes/menu";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Menu API!");
});

export default app;
