import dotenv from "dotenv";

dotenv.config();

export const TWEET_LENGTH = 280;
export const SERVER =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://threadder-app.herokuapp.com/";
