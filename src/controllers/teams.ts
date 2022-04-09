import { Request, Response } from "express";
import { prisma } from "../server";

export const getTeam = async (req: Request, res: Response) => {
    try {
        const leader_id = req.query.leader_id as string;
        const member_id = req.query.member_id as string;

        let team_data;

        if (leader_id) {
            team_data = await prisma.team.findFirst({ where: { fk_leader_uid: parseInt(leader_id) } });
        } else if (member_id) {
            team_data = await prisma.$queryRaw`
                select * from "Team" 
                    left join "TeamMember" 
                        on "Team".id = "TeamMember".fk_team_id 
                    where "TeamMember".fk_participant_id = ${parseInt(member_id)}
            `;
        } else {
            team_data = await prisma.team.findMany();
        }

        res.json({ data: team_data, msg: null });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const createTeam = async (req: Request, res: Response) => {
    try {
        const leader_id = req.body.leader_id as string;
        const name = req.body.name as string;
        const problem = req.body.problem as string;

        if (!leader_id || !problem) {
            res.status(400).json({ msg: "Leader ID or Problem Statement missing" });
        }

        const leader_data = await prisma.participant.findFirst({ where: { id: parseInt(leader_id) } });

        if (!leader_data) return res.status(400).json({ msg: "No participant found with that ID" });

        const duplicate_leader_data = await prisma.team.findFirst({ where: { fk_leader_uid: parseInt(leader_id) } });

        if (duplicate_leader_data)
            return res.status(400).json({ data: duplicate_leader_data, msg: "Another team has the same leader" });

        const team_data = await prisma.team.create({ data: { fk_leader_uid: parseInt(leader_id), name, problem } });

        await prisma.teamMember.create({ data: { fk_team_id: team_data.id, fk_participant_id: parseInt(leader_id) } });

        res.json({ data: team_data, msg: null });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const addTeamMember = async (req: Request, res: Response) => {
    try {
        const participant_id = req.body.participant_id as string;
        const team_id = req.body.team_id as string;

        if (!participant_id || !team_id) {
            res.status(400).json({ msg: "Participant ID or Team ID is missing" });
        }

        const member_check_data = await prisma.teamMember.findFirst({
            where: { fk_participant_id: parseInt(participant_id) },
        });

        if (member_check_data) {
            res.status(400).json({ data: member_check_data, msg: "Participant is already a part of some other team" });
        }

        const team_data = await prisma.team.findFirst({ where: { id: parseInt(team_id) } });

        if (!team_data) {
            return res.status(400).json({ msg: "No team found with that team ID" });
        }

        const member_data = await prisma.teamMember.create({
            data: { fk_team_id: team_data.id, fk_participant_id: parseInt(participant_id) },
        });

        res.json({ data: member_data, msg: "Participant added as team member" });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};
