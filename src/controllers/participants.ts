import { Request, Response } from "express";
import { prisma } from "../server";

export const getParticipants = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        const participant_id = req.query.participant_id as string;

        let participant_data;

        if (email) {
            participant_data = await prisma.participant.findMany({ where: { email: { contains: email as string } } });
        } else if (participant_id) {
            participant_data = await prisma.participant.findFirst({ where: { id: parseInt(participant_id) } });
        } else {
            participant_data = await prisma.participant.findMany();
        }

        res.json({ data: participant_data, msg: null });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const createParticipants = async (req: Request, res: Response) => {
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

        const participant_data = await prisma.participant.create({
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
    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "internal server error" });
    }
};
