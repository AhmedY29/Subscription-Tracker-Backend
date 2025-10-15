import dotenv from "dotenv";

dotenv.config();

export const
    {
        PORT,
        DB_URI,
        EMAIL_PASSWORD,
        JWT_SECRET,
        ARCJET_KEY
    } = process.env