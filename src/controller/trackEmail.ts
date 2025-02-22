import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { Request, Response } from "express";
import { getOpenedEmails, getUnsubscribedEmails, trackEmailOpen, unsubscribeEmail } from "../database";
import { EmailTracking, TrackEmailQuery } from "../types/types";
import { unsubscribeHTML } from "../utils/unsubscribeHTML";
dotenv.config();

export class TrackEmail{

    static validateAndTrackEmail = (tracker:TrackEmailQuery, req: Request, res: Response) => {
        // 🚨 Validate API Key
        const { email, emailType, api_key } = tracker;

        if (api_key !== process.env.API_KEY) return res.status(403).json({ error: "Unauthorized access" });
        
        // 🚨 Validate email input
        if (!email || typeof email !== "string") return res.status(400).json({ error: "Invalid email" });
        
        const userAgent = req.get("User-Agent") || "unknown";
        let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
        if (Array.isArray(ip)) {
            ip = ip.join(", ");
        }
        
        const email_tracking: EmailTracking = {
            email: email,
            emailType: emailType || "unknown",
            ip: ip || "unknown",
            userAgent: userAgent || "unknown"
        };
        console.log("📧 Email Opened:", email, "\nEmail Type:", emailType);
        trackEmailOpen(email_tracking);

        const imagePath = path.join(__dirname, "../../logo.png");
        res.setHeader("Content-Type", "image/png");
        res.sendFile(imagePath);
    };


    static trackEmailWithJWT =  async (req: Request, res: Response) => {
        const { number } = req.params;
        try {
            const jwtSecret = process.env.JWT_SECRET || "";
            const decoded = jwt.verify(number, jwtSecret) as TrackEmailQuery;
            TrackEmail.validateAndTrackEmail(decoded, req, res);
            return;
        } catch (error) {
            console.error("❌ Invalid Token:", error instanceof Error ? error.message : error);
            res.status(403).send("Unauthorized");
        }
    }

    static trackEmail = async (req: Request, res: Response) => {
        try {
            const track = req.query as TrackEmailQuery;
            TrackEmail.validateAndTrackEmail(track, req, res);
            return;
        } catch (error) {
            if (error instanceof Error && error.message === "Email is unsubscribed") {
                return res.status(400).json({ error: "Email is unsubscribed" });
            }
            console.error("Error in track-email:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

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