import { Router } from "express";
import { createActivity, getActivities, getStats, invalidateActivity } from "../controllers/activities";

export const activitiesRouter = Router();

activitiesRouter.get("/", getActivities);

activitiesRouter.get("/stats", getStats);

activitiesRouter.post("/", createActivity);

activitiesRouter.delete("/", invalidateActivity);
