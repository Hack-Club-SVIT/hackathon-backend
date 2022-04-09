import { Router } from "express";
import { createParticipants, getParticipants } from "../controllers/participants";

export const participantRouter = Router();

participantRouter.get("/", getParticipants);
participantRouter.post("/", createParticipants);
