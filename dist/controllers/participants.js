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
exports.createParticipants = exports.getParticipants = void 0;
const server_1 = require("../server");
const getParticipants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const participant_id = req.query.participant_id;
        let participant_data;
        if (email) {
            participant_data = yield server_1.prisma.participant.findMany({ where: { email: { contains: email } } });
        }
        else if (participant_id) {
            participant_data = yield server_1.prisma.participant.findFirst({ where: { id: parseInt(participant_id) } });
        }
        else {
            participant_data = yield server_1.prisma.participant.findMany();
        }
        res.json({ data: participant_data, msg: null });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.getParticipants = getParticipants;
const createParticipants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const shirt_size = req.body.shirt_size;
        const gender = req.body.gender;
        const college = req.body.college;
        const devfolio_profile = req.body.devfolio_profile;
        const mobile = req.body.mobile;
        const referral_code = req.body.referral_code;
        if (!email || !first_name || !last_name || !shirt_size || !gender || !college || !devfolio_profile || !mobile) {
            return res.status(400).json({ msg: "Params missing" });
        }
        const participant_data = yield server_1.prisma.participant.create({
            data: {
                college,
                devfolio_profile,
                email,
                first_name,
                gender,
                last_name,
                mobile,
                shirt_size,
                referral_code: referral_code || null,
            },
        });
        res.json({ data: participant_data, msg: "Participant added" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.createParticipants = createParticipants;
