import dotenv from "dotenv";

dotenv.config();

export const TWEET_LENGTH = 280;
export const SERVER =
    process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";
export const UNTITLED_NAME = "Untitled User";
export const UNTITLED_SCREEN_NAME = "untitled_user";
export const UNTITLED_PROFILE_IMAGE = "";
export const MAX_IMAGE_SIZE = 5 * 1000 * 1000; // Size in bytes
export const MAX_GIF_SIZE = 15 * 1000 * 1000; // Size in bytes
export const THREADDER_DB_NAME = "threadderDB";
export const THREADDER_DB_VERSION = 1;
