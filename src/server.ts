import express from "express";
import cors from "cors";
import path from "path";
import { trackEmailOpen, getOpenedEmails } from "./database";

const app = express();
app.use(cors());

app.get("/track-email", (req, res) => {
    const { email } = req.query;
    if (email && typeof email === "string") {
        console.log(`📩 Email opened: ${email}`);
        trackEmailOpen(email);
    }

    // Ensure the pixel image is correctly served
    const imagePath = path.join(__dirname, "../public/pixel.png");
    res.setHeader("Content-Type", "image/png");
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error("Error sending pixel:", err);
            res.status(500).send("Internal Server Error");
        }
    });
});

// Get tracked email opens
app.get("/opened-emails", (req, res) => {
    res.json(getOpenedEmails());
});

// ✅ Export app for testing
export { app };

// ✅ Only start the server if NOT in testing mode
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`📡 Server running on port ${PORT}`));
}
