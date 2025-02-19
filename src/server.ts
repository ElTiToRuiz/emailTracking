import express from "express";
import { TrackEmail } from "./controller/trackEmail";
import { corsOptions } from "./middleware/cors";
import { checkRateLimiter } from "./middleware/rateLimit";

const app = express();

app.use(corsOptions());

// ✅ Rate Limiting to avoid spam attacks
app.use("/track-email", checkRateLimiter());

// Endpoint to track email opens
app.get("/track-email",  TrackEmail.trackEmail);

// Endpoint to get all opened emails
app.get("/opened-emails", TrackEmail.openedEmails);

// ✅ Export app for testing
export { app };

// ✅ Only start the server if NOT in testing mode
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`📡 Server running on port ${PORT}`));
}
