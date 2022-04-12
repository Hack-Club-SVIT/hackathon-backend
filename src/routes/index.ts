import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { activitiesRouter } from "./activities";
import { attendedRouter } from "./attended";
import { participantRouter } from "./participants";
import { teamsRouter } from "./teams";
import { userRouter } from "./user";

export const router = Router();

router.use("/user", userRouter);
router.use("/activities", authMiddleware, activitiesRouter);
router.use("/participants", authMiddleware, participantRouter);
router.use("/teams", authMiddleware, teamsRouter);
router.use("/attended", authMiddleware, attendedRouter);
