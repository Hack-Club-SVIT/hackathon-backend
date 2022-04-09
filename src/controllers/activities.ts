import { Request, Response } from "express";
import { prisma } from "../server";
import utils from "../utils";

export const getActivities = async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const name = req.query.name;
        const valid = req.query.valid === "false" ? false : true;

        let activities_data;

        if (id) {
            activities_data = await prisma.activity.findMany({ where: { id: parseInt(id), valid } });
        } else if (name) {
            activities_data = await prisma.activity.findMany({
                where: { name: name as string, valid },
            });
        }

        activities_data = await prisma.activity.findMany({ where: { valid } });

        res.json({ data: activities_data, msg: null });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const createActivity = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;

        if (!name) return res.status(400).json({ msg: "activity name not found" });

        const old_activity = await prisma.activity.findFirst({ where: { name: utils.formatter(name) } });

        if (old_activity) {
            res.json({ data: old_activity, msg: "Activity already exists" });
        }

        const new_activity = await prisma.activity.create({ data: { name: utils.formatter(name) } });

        res.json({ data: new_activity, msg: "Activity created!" });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const invalidateActivity = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;

        if (!id) return res.status(400).json({ msg: "activity id not found" });

        const updated_activity = await prisma.activity.update({ where: { id: parseInt(id) }, data: { valid: false } });

        res.json({ data: updated_activity, msg: "Activity invalidated!" });
    } catch (e) {
        res.status(500).json({ msg: "internal server error" });
    }
};
