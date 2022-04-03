import cors from "cors";
import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(
	cors({
		origin: "*",
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

app.listen(port, () => {
	console.log(`Server running on post ${port} 🏃`);
});
