"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRouter = void 0;
const express_1 = require("express");
const activities_1 = require("../controllers/activities");
exports.activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter.get("/", activities_1.getActivities);
exports.activitiesRouter.post("/", activities_1.createActivity);
exports.activitiesRouter.delete("/", activities_1.invalidateActivity);
