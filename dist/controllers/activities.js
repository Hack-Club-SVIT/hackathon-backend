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
exports.invalidateActivity = exports.createActivity = exports.getActivities = void 0;
const server_1 = require("../server");
const utils_1 = __importDefault(require("../utils"));
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const name = req.query.name;
        const valid = req.query.valid === "false" ? false : true;
        let activities_data;
        if (id) {
            activities_data = yield server_1.prisma.activity.findMany({ where: { id: parseInt(id), valid } });
        }
        else if (name) {
            activities_data = yield server_1.prisma.activity.findMany({
                where: { name: name, valid },
            });
        }
        activities_data = yield server_1.prisma.activity.findMany({ where: { valid } });
        res.json({ data: activities_data, msg: null });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.getActivities = getActivities;
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name)
            return res.status(400).json({ msg: "activity name not found" });
        const old_activity = yield server_1.prisma.activity.findFirst({ where: { name: utils_1.default.formatter(name) } });
        if (old_activity) {
            res.json({ data: old_activity, msg: "Activity already exists" });
        }
        const new_activity = yield server_1.prisma.activity.create({ data: { name: utils_1.default.formatter(name) } });
        res.json({ data: new_activity, msg: "Activity created!" });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.createActivity = createActivity;
const invalidateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (!id)
            return res.status(400).json({ msg: "activity id not found" });
        const updated_activity = yield server_1.prisma.activity.update({ where: { id: parseInt(id) }, data: { valid: false } });
        res.json({ data: updated_activity, msg: "Activity invalidated!" });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.invalidateActivity = invalidateActivity;
