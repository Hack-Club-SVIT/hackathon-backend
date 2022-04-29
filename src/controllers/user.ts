import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../server";

export const userLogin = async (req: Request, res: Response) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(400).json({ msg: "token missing" });
        }

        const client_data = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + req.body.token
        );

        if (!client_data) {
            return res.status(400).json({ msg: "no google account found" });
        }

        const user = await prisma.user.findFirst({
            where: { email: client_data.data.email },
        });

        if (!user) {
            if (client_data.data.email?.includes("@hackclubsvit")) {
                await prisma.user.create({ data: { email: client_data.data.email, role: "ADMIN" } });
            } else {
                return res.status(400).json({ msg: "no user found" });
            }
        }

        const user_data = await prisma.user.findFirst({ where: { email: client_data.data.email } });

        res.json({ data: { user_data } });
    } catch (error) {
        res.status(500).json({ msg: "internal server error" });
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        if (req.body.user.role !== "SUPERADMIN") return res.status(401).json({ msg: "Admin only" });

        const email = req.body.email;
        const role = req.body.role;

        if (!email || !role) return res.status(400).json({ msg: "Email or role missing" });

        const new_user_data = await prisma.user.create({
            data: {
                email,
                role,
            },
        });

        res.json({ data: { new_user_data } });
    } catch (error) {
        res.status(500).json({ msg: "internal server error" });
    }
};
