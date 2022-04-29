import { Router } from "express";
import { addUser, userLogin } from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.post("/login", userLogin);
userRouter.post("/add", authMiddleware, addUser);
