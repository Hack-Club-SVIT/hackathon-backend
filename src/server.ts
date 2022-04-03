import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { router as apiRoutes } from "./routes";
const app = express();

dotenv.config();

const port = process.env.PORT;

export const prisma = new PrismaClient();

app.use(
	cors({
		origin: "*",
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

app.use("/", apiRoutes);

app.listen(port, async () => {
	console.log(`Server running on post ${port} 🏃`);
});
