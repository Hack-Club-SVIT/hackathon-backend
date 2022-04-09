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
exports.prisma = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const routes_1 = require("./routes");
var bodyParser = require("body-parser");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
exports.prisma = new client_1.PrismaClient();
app.use(bodyParser.json());
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use("/", routes_1.router);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on post ${port} 🏃`);
    exports.prisma.$connect();
}));
