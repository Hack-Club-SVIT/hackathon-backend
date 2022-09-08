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
exports.authMiddleware = void 0;
const server_1 = require("../server");
const axios_1 = __importDefault(require("axios"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({ msg: "token missing" });
        }
        const client_data = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + req.headers.token);
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
        req.body = Object.assign({ user: {
                email: (_b = client_data.data) === null || _b === void 0 ? void 0 : _b.email,
                first_name: (_c = client_data.data) === null || _c === void 0 ? void 0 : _c.given_name,
                last_name: (_d = client_data.data) === null || _d === void 0 ? void 0 : _d.family_name,
                role: (user === null || user === void 0 ? void 0 : user.role) || "ADMIN",
                user_id: user === null || user === void 0 ? void 0 : user.id,
            } }, req.body);
        next();
    }
    catch (err) {
        return res.status(500).json({ msg: "internal server error" });
    }
});
exports.authMiddleware = authMiddleware;
