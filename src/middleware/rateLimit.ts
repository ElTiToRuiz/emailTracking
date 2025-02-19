import rateLimit from "express-rate-limit";

export const checkRateLimiter = () => {
    return rateLimit({
        windowMs: 10 * 60 * 1000, // 10 min
        max: 100, // Máx. 100 requests por IP cada 10 min
        message: "Too many requests, please try again later."
    });
};
