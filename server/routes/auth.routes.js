import express from "express";
import * as authController from "../controllers/auth.controller.js"
import { AuthorizationMiddleware } from "../middlewares/auth.js";

const router = express.Router();
// router.use(AuthorizationMiddleware);
router.get("/api/verify-token", AuthorizationMiddleware, authController.verifyToken);

export default router;