import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "../server/config/logger/main.js";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();
const app = express();;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use((req, res, next) => {
   logger.info(`${new Date().toISOString()} ${req.method} ${req.url}`)
  next();
});
app.use(todoRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use((req, res) => {
  res.status(400).json({ error: "Маршрут не знайдено" });
});
app.use((err, req, res, next) => {
  logger.error("Глобальна помилка:", err);
  res.status(500).json({ error: "Внутрішня помилка сервера" });
});
export default app;