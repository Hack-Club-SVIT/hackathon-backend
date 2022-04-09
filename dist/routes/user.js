"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
// import { login } from "../controllers/user";
const prisma = new client_1.PrismaClient();
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/create", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rposfagsdlkjf = yield prisma.user.create({
            data: {
                username: "cheesetoast",
                role: "SUPERADMIN",
                password: "urmom",
            },
        });
        console.log(rposfagsdlkjf);
        res.send("asdjklfhlk");
    }
    catch (e) {
        console.log(e);
    }
}));
