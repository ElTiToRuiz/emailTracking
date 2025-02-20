import { getOpenedEmails, getUnsubscribedEmails, trackEmailOpen, unsubscribeEmail } from "../database";
import { EmailTracking, TrackEmailQuery } from "../types/types";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { unsubscribeHTML } from "../utils/unsubscribeHTML";
dotenv.config();

export class TrackEmail{
    static trackEmail = async (req: Request, res: Response) => {
        try {
            const { email, emailType, api_key } = req.query as TrackEmailQuery;
            let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
            if (Array.isArray(ip)) {
                ip = ip.join(", ");
            }
            const userAgent = req.get("User-Agent") || "unknown";
    
            // 🚨 Validate API Key
            if (api_key !== process.env.API_KEY) {
                return res.status(403).json({ error: "Unauthorized access" });
            }
    
            // 🚨 Validate email input
            if (!email || typeof email !== "string") {
                return res.status(400).json({ error: "Invalid email" });
            }
    
            
            // ✅ Track email open in database
            const email_tracking: EmailTracking = {
                email: email,
                emailType: emailType as string|| "unknown",
                ip: ip || "unknown",
                userAgent: userAgent || "unknown"
            }
    
            trackEmailOpen(email_tracking);
    
            // ✅ Send tracking pixel
            const pixel = Buffer.from(
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/ozXwAAAABJRU5ErkJggg==",
                "base64"
            );
    
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Length", pixel.length.toString());
            return res.end(pixel);
        } catch (error) {
            if (error instanceof Error && error.message === "Email is unsubscribed") {
                return res.status(400).json({ error: "Email is unsubscribed" });
            }
            console.error("Error in track-email:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static openedEmails = async (req: Request, res: Response) => {
        try {
            const { api_key } = req.query as TrackEmailQuery;
            if (api_key !== process.env.API_KEY) return res.status(403).json({ error: "Unauthorized access" });
            const openedEmails = getOpenedEmails();
            res.json(openedEmails);
        } catch (error) {
            console.error("Error fetching opened emails:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static unsubscribe = async (req: Request, res: Response) => {
        try {
            const email = req.query.email as string;
            if (!email || typeof email !== "string") return res.status(400).json({ error: "Invalid email" });
            unsubscribeEmail(email);
            return res.send(unsubscribeHTML); 
        } catch (error) {
            console.error("Error in unsubscribe:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static unsubscribeEmails = async (req: Request, res: Response) => {
        try {
            const { api_key } = req.query as TrackEmailQuery;
            if (api_key !== process.env.API_KEY) return res.status(403).json({ error: "Unauthorized access" });
            const unsubscribe = getUnsubscribedEmails();
            res.json(unsubscribe);
        } catch (error) {
            console.error("Error fetching opened emails:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
} 