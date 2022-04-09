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
exports.authMiddleware = void 0;
const google_auth_library_1 = require("google-auth-library");
const server_1 = require("../server");
const oAuth2Client = new google_auth_library_1.OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({ msg: "token missing" });
        }
        const authClient = yield oAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = authClient.getPayload();
        if (!payload) {
            return res.status(400).json({ msg: "no google account found" });
        }
        const user = yield server_1.prisma.user.findFirst({
            where: { email: payload.email },
        });
        if (!user) {
            if ((_a = payload.email) === null || _a === void 0 ? void 0 : _a.includes("@hackclubsvit")) {
                yield server_1.prisma.user.create({ data: { email: payload.email, role: "ADMIN" } });
            }
            else {
                return res.status(400).json({ msg: "no user found" });
            }
        }
        req.body = Object.assign({ user: {
                email: payload === null || payload === void 0 ? void 0 : payload.email,
                first_name: payload === null || payload === void 0 ? void 0 : payload.name,
                last_name: payload === null || payload === void 0 ? void 0 : payload.family_name,
                role: (user === null || user === void 0 ? void 0 : user.role) || "ADMIN",
            } }, req.body);
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error" });
    }
});
exports.authMiddleware = authMiddleware;
