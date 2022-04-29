"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsRouter = void 0;
const express_1 = require("express");
const teams_1 = require("../controllers/teams");
exports.teamsRouter = (0, express_1.Router)();
exports.teamsRouter.get("/", teams_1.getTeam);
exports.teamsRouter.post("/", teams_1.createTeam);
exports.teamsRouter.post("/member", teams_1.addTeamMember);
