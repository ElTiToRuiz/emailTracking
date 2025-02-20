import express from "express";
import { TrackEmail } from "./controller/trackEmail";
import { corsOptions } from "./middleware/cors";
import { checkRateLimiter } from "./middleware/rateLimit";

const app = express();

app.set("trust proxy", true);

app.use(corsOptions());

// ✅ Rate Limiting to avoid spam attacks
app.use("/track-email", checkRateLimiter());

// Endpoint to track email opens
app.get("/track-email",  TrackEmail.trackEmail);

// Endpoint to get all opened emails
app.get("/opened-emails", TrackEmail.openedEmails);

// Endpoint to make a user opt-out
app.get("/opt-out", TrackEmail.unsubscribe);

// Endpoint to get all unsubscribed emails
app.get("/opt-out-emails", TrackEmail.unsubscribeEmails);

// ✅ Export app for testing
export { app };

// ✅ Only start the server if NOT in testing mode
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`📡 Server running on port ${PORT}`));
}
