"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendedRouter = void 0;
const express_1 = require("express");
const attended_1 = require("../controllers/attended");
exports.attendedRouter = (0, express_1.Router)();
exports.attendedRouter.get("/", attended_1.getAttended);
exports.attendedRouter.post("/", attended_1.createAttend);
exports.attendedRouter.delete("/", attended_1.removeAttended);
