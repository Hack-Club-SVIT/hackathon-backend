import { Router } from "express";
import { addTeamMember, createTeam, getTeam } from "../controllers/teams";

export const teamsRouter = Router();

teamsRouter.get("/", getTeam);
teamsRouter.post("/", createTeam);
teamsRouter.post("/member", addTeamMember);
