import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { activitiesRouter } from "./activities";
import { participantRouter } from "./participants";

export const router = Router();

router.use("/activities", authMiddleware, activitiesRouter);
router.use("/participants", authMiddleware, participantRouter);
