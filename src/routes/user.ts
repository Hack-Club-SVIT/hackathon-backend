import { Router } from "express";
import { userLogin } from "../controllers/user";

export const userRouter = Router();

userRouter.post("/login", userLogin);
