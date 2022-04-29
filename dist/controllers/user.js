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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const axios_1 = __importDefault(require("axios"));
const server_1 = require("../server");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ msg: "token missing" });
        }
        const client_data = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + req.body.token);
        if (!client_data) {
            return res.status(400).json({ msg: "no google account found" });
        }
        const user = yield server_1.prisma.user.findFirst({
            where: { email: client_data.data.email },
        });
        if (!user) {
            if ((_a = client_data.data.email) === null || _a === void 0 ? void 0 : _a.includes("@hackclubsvit")) {
                yield server_1.prisma.user.create({ data: { email: client_data.data.email, role: "ADMIN" } });
            }
            else {
                return res.status(400).json({ msg: "no user found" });
            }
        }
        const user_data = yield server_1.prisma.user.findFirst({ where: { email: client_data.data.email } });
        res.json({ data: { user_data } });
    }
    catch (error) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.userLogin = userLogin;
