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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users_json_1 = __importDefault(require("../users.json"));
exports.default = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    for (const user of users_json_1.default) {
        const { name, college, devfolio_username: devfolio_profile, phone, gender, } = user;
        yield prisma.participant.create({
            data: {
                name,
                shirt_size: "M",
                college,
                devfolio_profile,
                gender,
                mobile: phone,
                referral_code: "",
            },
        });
    }
});
