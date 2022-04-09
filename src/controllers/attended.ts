import { Request, Response } from "express";
import { prisma } from "../server";

export const getAttended = async (req: Request, res: Response) => {
    try {
        const admin_id = req.query.admin_id as string;
        const participant_id = req.query.participant_id as string;
        const activity_id = req.query.activity_id as string;
        const attendence_id = req.query.attendence_id as string;
        const attended = req.query.attended === "false" ? false : true;

        let attended_data;

        if (admin_id) {
            attended_data = await prisma.attended.findMany({ where: { fk_uid: parseInt(admin_id), attended } });
        } else if (participant_id) {
            attended_data = await prisma.attended.findMany({
                where: { fk_participant_id: parseInt(participant_id), attended },
            });
        } else if (activity_id) {
            attended_data = await prisma.attended.findMany({
                where: { fk_activity_id: parseInt(activity_id), attended },
            });
        } else if (attendence_id) {
            attended_data = await prisma.attended.findFirst({
                where: { id: parseInt(attendence_id) },
            });
        } else {
            attended_data = await prisma.attended.findMany({ where: { attended } });
        }

        res.json({ data: attended_data, msg: null });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const createAttend = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user.user_id;
        const participant_id = req.body.participant_id;
        const activity_id = req.body.activity_id;
        const description = req.body.description || null;

        if (!participant_id || !activity_id) {
            return res.status(400).json({ msg: "Participant ID or Activity ID missing" });
        }

        const participant = await prisma.participant.findFirst({ where: { id: participant_id } });

        if (!participant) {
            return res.status(400).json({ msg: "No participant found. Please check the participant id" });
        }

        const old_attended = await prisma.attended.findFirst({
            where: { fk_participant_id: participant_id, fk_activity_id: activity_id },
        });

        if (old_attended) {
            if (!old_attended.attended) {
                const updated_attendence = await prisma.attended.update({
                    where: { id: old_attended.id },
                    data: { attended: true },
                });

                return res.json({ data: updated_attendence, msg: "Attendence updated!" });
            } else {
                return res.status(409).json({ msg: "Participant has already attended this event" });
            }
        }

        const created_attend = await prisma.attended.create({
            data: {
                attended: true,
                fk_activity_id: activity_id,
                fk_participant_id: participant_id,
                fk_uid: user_id,
                description: description,
            },
        });

        res.json({ data: created_attend, msg: "Activity attened!" });
    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "internal server error" });
    }
};

export const removeAttended = async (req: Request, res: Response) => {
    try {
        const attended_id = req.body.attended_id as string;
        const participant_id = req.body.participant_id as string;
        const activity_id = req.body.activity_id as string;

        if (!participant_id && !activity_id && !attended_id) {
            return res.status(400).json({ msg: "Participant ID or Activity ID or Attended ID missing" });
        }

        let attended_data;

        if (attended_id) {
            attended_data = await prisma.attended.update({
                where: { id: parseInt(attended_id) },
                data: { attended: false },
            });
        } else if (participant_id) {
            attended_data = await prisma.$queryRaw`
                update "Attended"
                    set attended = false
                        where fk_participant_id = ${parseInt(participant_id)} 
            `;
        } else if (activity_id) {
            attended_data = await prisma.$queryRaw`
                update "Attended"
                    set attended = false
                        where fk_activity_id = ${parseInt(activity_id)} 
            `;
        }

        res.json({ data: attended_data, msg: "Attendence updated!" });
    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "internal server error" });
    }
};
