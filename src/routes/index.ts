import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { activitiesRouter } from "./activities";

export const router = Router();

router.use("/activities", authMiddleware, activitiesRouter);
