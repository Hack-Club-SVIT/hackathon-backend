import { Router } from "express";
import { createAttend, getAttended, removeAttended } from "../controllers/attended";

export const attendedRouter = Router();

attendedRouter.get("/", getAttended);
attendedRouter.post("/", createAttend);
attendedRouter.delete("/", removeAttended);
