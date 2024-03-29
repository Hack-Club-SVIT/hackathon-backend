"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/login", user_1.userLogin);
exports.userRouter.post("/add", authMiddleware_1.authMiddleware, user_1.addUser);
