import { Router } from "express";
import { createActivity, getActivities, invalidateActivity } from "../controllers/activities";

export const activitiesRouter = Router();

activitiesRouter.get("/", getActivities);

activitiesRouter.post("/", createActivity);

activitiesRouter.delete("/", invalidateActivity);
