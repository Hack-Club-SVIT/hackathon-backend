"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("./user");
exports.router = (0, express_1.Router)();
exports.router.use("/user", user_1.userRouter);
