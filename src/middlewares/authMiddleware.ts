import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";

import axios from "axios";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({ msg: "token missing" });
        }

        const client_data = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + req.headers.token
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

        req.body = {
            user: {
                email: client_data.data?.email,
                first_name: client_data.data?.given_name,
                last_name: client_data.data?.family_name,
                role: user?.role || "ADMIN",
                user_id: user?.id,
            },
            ...req.body,
        };

        next();
    } catch (err) {
        return res.status(500).json({ msg: "internal server error" });
    }
};
