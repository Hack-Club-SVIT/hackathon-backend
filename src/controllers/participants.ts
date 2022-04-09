// import { Participant, PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";

// const prisma = new PrismaClient();

// export const getParticipants: Promise<Participant[]> = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	const { cursor, take } = req.query;

// 	return prisma.participant.findMany({
// 		skip: 1,
// 		take,
// 		cursor: {
// 			id: cursor,
// 		},
// 	});
// };
