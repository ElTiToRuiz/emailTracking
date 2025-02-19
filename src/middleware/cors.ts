import cors from "cors";

const allowedOrigins = ["http://159.223.225.167", "https://api.zyroex.com"];

export const corsOptions = () => {
    return cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    });
};
