import dotenv from "dotenv";

dotenv.config();

export const TWEET_LENGTH = 280;
export const SERVER =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://threadder-app.herokuapp.com/";
export const UNTITLED_NAME = "Untitled User";
export const UNTITLED_SCREEN_NAME = "untitled_user";
export const UNTITLED_PROFILE_IMAGE = "";
