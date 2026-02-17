import express from "express";
import * as userContrller from "../controllers/user.controller.js";
import { AuthorizationMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/api/registration",userContrller.registrationUser)
router.post("/api/login", userContrller.loginUser);
router.patch("/api/EditEmail",AuthorizationMiddleware, userContrller.updateEmail);
router.patch("/api/EditUserName",AuthorizationMiddleware, userContrller.updateUserName);
router.patch("/api/EditPassword", AuthorizationMiddleware, userContrller.updatePassword);
router.delete("/api/deleteUser", AuthorizationMiddleware, userContrller.deleteUser);


export default router;