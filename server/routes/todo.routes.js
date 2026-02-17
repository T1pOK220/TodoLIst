import express from "express";
import * as todoController from "../controllers/todo.controller.js";
import { AuthorizationMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/api/addtodo",AuthorizationMiddleware, todoController.AddDo);
router.get("/api/todos",AuthorizationMiddleware, todoController.getTodoByUser);
router.patch("/api/update-item",AuthorizationMiddleware, todoController.updateItem);
router.delete("/api/delete-item",AuthorizationMiddleware, todoController.deleteOneItem);
router.get("/api/completed",AuthorizationMiddleware, todoController.completed);
router.delete("/api/deleteAll", AuthorizationMiddleware,todoController.deleteAll);
router.patch("/api/update",AuthorizationMiddleware, todoController.updateTitle);
router.patch("/api/completedAll",AuthorizationMiddleware, todoController.completedAll);
export default router;