import dotenv from "dotenv";

dotenv.config();

import USERS from "../users.json";

export default async (prisma: any) => {
    for (const user of USERS) {
        const {
            name,

            college,
            devfolio_username: devfolio_profile,
            phone,
            gender,
        } = user;

        await prisma.participant.create({
            data: {
                name,
                shirt_size: "M",
                college,
                devfolio_profile,
                gender,
                mobile: phone,
                referral_code: "",
            },
        });
    }
};
