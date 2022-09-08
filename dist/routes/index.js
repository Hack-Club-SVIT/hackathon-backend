"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const activities_1 = require("./activities");
const attended_1 = require("./attended");
const participants_1 = require("./participants");
const teams_1 = require("./teams");
const user_1 = require("./user");
exports.router = (0, express_1.Router)();
exports.router.use("/user", user_1.userRouter);
exports.router.use("/activities", authMiddleware_1.authMiddleware, activities_1.activitiesRouter);
exports.router.use("/participants", authMiddleware_1.authMiddleware, participants_1.participantRouter);
exports.router.use("/teams", authMiddleware_1.authMiddleware, teams_1.teamsRouter);
exports.router.use("/attended", authMiddleware_1.authMiddleware, attended_1.attendedRouter);
