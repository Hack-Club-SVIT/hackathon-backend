"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantRouter = void 0;
const express_1 = require("express");
const participants_1 = require("../controllers/participants");
exports.participantRouter = (0, express_1.Router)();
exports.participantRouter.get("/", participants_1.getParticipants);
exports.participantRouter.post("/", participants_1.createParticipants);
