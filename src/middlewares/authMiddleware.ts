import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../server";

const oAuth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({ msg: "token missing" });
        }

        const authClient = await oAuth2Client.verifyIdToken({
            idToken: token as string,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = authClient.getPayload();

        if (!payload) {
            return res.status(400).json({ msg: "no google account found" });
        }

        const user = await prisma.user.findFirst({
            where: { email: payload.email },
        });

        if (!user) {
            if (payload.email?.includes("@hackclubsvit")) {
                await prisma.user.create({ data: { email: payload.email, role: "ADMIN" } });
            } else {
                return res.status(400).json({ msg: "no user found" });
            }
        }

        req.body = {
            user: {
                email: payload?.email,
                first_name: payload?.name,
                last_name: payload?.family_name,
                role: user?.role || "ADMIN",
            },
            ...req.body,
        };

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error" });
    }
};
