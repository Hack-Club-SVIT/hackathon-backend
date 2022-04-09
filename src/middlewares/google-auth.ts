import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID || "",
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export const authUser = async (
	req: Request & any,
	res: Response,
	_next: NextFunction
) => {
	try {
		const token = req.body.token;
		if (!token) {
			return res.status(400).json({ msg: "token missing" });
		}

		const authClient = await oAuth2Client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = authClient.getPayload();
		req.user = {
			email: payload?.email,
			first_name: payload?.name,
			last_name: payload?.family_name,
		};
	} catch (err) {
		return res.status(500).json({ msg: "internal server error" });
	}
};
