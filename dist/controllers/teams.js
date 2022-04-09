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
exports.addTeamMember = exports.createTeam = exports.getTeam = void 0;
const server_1 = require("../server");
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leader_id = req.query.leader_id;
        const member_id = req.query.member_id;
        let team_data;
        if (leader_id) {
            team_data = yield server_1.prisma.team.findFirst({ where: { fk_leader_uid: parseInt(leader_id) } });
        }
        else if (member_id) {
            team_data = yield server_1.prisma.$queryRaw `
                select * from "Team" 
                    left join "TeamMember" 
                        on "Team".id = "TeamMember".fk_team_id 
                    where "TeamMember".fk_participant_id = ${parseInt(member_id)}
            `;
        }
        else {
            team_data = yield server_1.prisma.team.findMany();
        }
        res.json({ data: team_data, msg: null });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.getTeam = getTeam;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leader_id = req.body.leader_id;
        const name = req.body.name;
        const problem = req.body.problem;
        if (!leader_id || !problem) {
            res.status(400).json({ msg: "Leader ID or Problem Statement missing" });
        }
        const leader_data = yield server_1.prisma.participant.findFirst({ where: { id: parseInt(leader_id) } });
        if (!leader_data)
            return res.status(400).json({ msg: "No participant found with that ID" });
        const duplicate_leader_data = yield server_1.prisma.team.findFirst({ where: { fk_leader_uid: parseInt(leader_id) } });
        if (duplicate_leader_data)
            return res.status(400).json({ data: duplicate_leader_data, msg: "Another team has the same leader" });
        const team_data = yield server_1.prisma.team.create({ data: { fk_leader_uid: parseInt(leader_id), name, problem } });
        yield server_1.prisma.teamMember.create({ data: { fk_team_id: team_data.id, fk_participant_id: parseInt(leader_id) } });
        res.json({ data: team_data, msg: null });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.createTeam = createTeam;
const addTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const participant_id = req.body.participant_id;
        const team_id = req.body.team_id;
        if (!participant_id || !team_id) {
            res.status(400).json({ msg: "Participant ID or Team ID is missing" });
        }
        const member_check_data = yield server_1.prisma.teamMember.findFirst({
            where: { fk_participant_id: parseInt(participant_id) },
        });
        if (member_check_data) {
            res.status(400).json({ data: member_check_data, msg: "Participant is already a part of some other team" });
        }
        const team_data = yield server_1.prisma.team.findFirst({ where: { id: parseInt(team_id) } });
        if (!team_data) {
            return res.status(400).json({ msg: "No team found with that team ID" });
        }
        const member_data = yield server_1.prisma.teamMember.create({
            data: { fk_team_id: team_data.id, fk_participant_id: parseInt(participant_id) },
        });
        res.json({ data: member_data, msg: "Participant added as team member" });
    }
    catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
});
exports.addTeamMember = addTeamMember;
