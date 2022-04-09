"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const activities_1 = require("./activities");
exports.router = (0, express_1.Router)();
exports.router.use("/activities", authMiddleware_1.authMiddleware, activities_1.activitiesRouter);
