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
exports.removeAttended = exports.createAttend = exports.getAttended = void 0;
const server_1 = require("../server");
const getAttended = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin_id = req.query.admin_id;
        const participant_id = req.query.participant_id;
        const activity_id = req.query.activity_id;
        const attendence_id = req.query.attendence_id;
        const attended = req.query.attended === "false" ? false : true;
        let attended_data;
        if (admin_id) {
            attended_data = yield server_1.prisma.attended.findMany({ where: { fk_uid: parseInt(admin_id), attended } });
        }
        else if (participant_id) {
            attended_data = yield server_1.prisma.attended.findMany({
                where: { fk_participant_id: parseInt(participant_id), attended },
            });
        }
        else if (activity_id) {
            attended_data = yield server_1.prisma.attended.findMany({
                where: { fk_activity_id: parseInt(activity_id), attended },
            });
        }
        else if (attendence_id) {
            attended_data = yield server_1.prisma.attended.findFirst({
                where: { id: parseInt(attendence_id) },
            });
        }
        else {
            attended_data = yield server_1.prisma.attended.findMany({ where: { attended } });
        }
        res.json({ data: attended_data, msg: null });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.getAttended = getAttended;
const createAttend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.body.user.user_id;
        const participant_id = req.body.participant_id;
        const activity_id = req.body.activity_id;
        const description = req.body.description || null;
        if (!participant_id || !activity_id) {
            return res.status(400).json({ msg: "Participant ID or Activity ID missing" });
        }
        const participant = yield server_1.prisma.participant.findFirst({ where: { id: participant_id } });
        if (!participant) {
            return res.status(400).json({ msg: "No participant found. Please check the participant id" });
        }
        const old_attended = yield server_1.prisma.attended.findFirst({
            where: { fk_participant_id: participant_id, fk_activity_id: activity_id },
        });
        if (old_attended) {
            if (!old_attended.attended) {
                const updated_attendence = yield server_1.prisma.attended.update({
                    where: { id: old_attended.id },
                    data: { attended: true },
                });
                return res.json({ data: updated_attendence, msg: "Attendence updated!" });
            }
            else {
                return res.status(409).json({ msg: "Participant has already attended this event" });
            }
        }
        const created_attend = yield server_1.prisma.attended.create({
            data: {
                attended: true,
                fk_activity_id: activity_id,
                fk_participant_id: participant_id,
                fk_uid: user_id,
                description: description,
            },
        });
        res.json({ data: created_attend, msg: "Activity attended!" });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.createAttend = createAttend;
const removeAttended = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attended_id = req.body.attended_id;
        const participant_id = req.body.participant_id;
        const activity_id = req.body.activity_id;
        if (!participant_id && !activity_id && !attended_id) {
            return res.status(400).json({ msg: "Participant ID or Activity ID or Attended ID missing" });
        }
        let attended_data;
        if (attended_id) {
            attended_data = yield server_1.prisma.attended.update({
                where: { id: parseInt(attended_id) },
                data: { attended: false },
            });
        }
        else {
            attended_data = yield server_1.prisma.$queryRaw `
                update "Attended"
                    set attended = false
                        where fk_participant_id = ${parseInt(participant_id)} and fk_activity_id = ${parseInt(activity_id)};
            `;
        }
        res.json({ data: attended_data, msg: "Attendence updated!" });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.removeAttended = removeAttended;
