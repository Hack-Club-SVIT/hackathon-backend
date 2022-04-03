import { Router } from "express";
import { login } from "../controllers/user";

export const userRouter = Router();

userRouter.post("/login", login);
