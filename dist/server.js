"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.listen(port, () => {
    console.log(`Server running on post ${port} 🏃`);
});
