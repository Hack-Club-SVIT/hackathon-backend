import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
// import { login } from "../controllers/user";

const prisma = new PrismaClient();

export const userRouter = Router();

userRouter.get("/create", async (_req: Request, res: Response) => {
	try {
		const rposfagsdlkjf = await prisma.user.create({
			data: {
				username: "cheesetoast",
				role: "SUPERADMIN",
				password: "urmom",
			},
		});
		console.log(rposfagsdlkjf);

		res.send("asdjklfhlk");
	} catch (e) {
		console.log(e);
	}
});
