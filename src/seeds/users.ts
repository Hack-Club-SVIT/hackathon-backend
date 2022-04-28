import dotenv from "dotenv";

dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";

import USERS from "../users.json";

export default async (prisma: PrismaClient<PrismaClientOptions, never>) => {
	for (const user of USERS) {
		const {
			first_name,
			last_name,
			shirt_size,
			college,
			devfolio_profile,
			email,
			gender,
		} = user;

		await prisma.participant.create({
			data: {
				first_name,
				last_name,
				shirt_size,
				college,
				devfolio_profile,
				email,
				gender,
				mobile: "",
				referral_code: "",
			},
		});
	}
};
