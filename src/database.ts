import Database from "better-sqlite3";
import { EmailTracking } from "./types/types";

// Conectar a la base de datos
const db = new Database("database.sqlite");

// Crear la tabla si no existe con nuevas columnas
db.exec(`
    CREATE TABLE IF NOT EXISTS email_tracking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        email_type TEXT NOT NULL, -- 'first-email', 'follow-up', 'last-email'
        opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip TEXT,
        user_agent TEXT,
        count INTEGER DEFAULT 1
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS unsubscribed_emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
    )
`);

// Función para registrar apertura de email o incrementar contador
export const trackEmailOpen = ({email, ip, userAgent, emailType}:EmailTracking) => {
    // Verificar si ya existe el email en la base de datos
    const exist = db.prepare("SELECT * FROM unsubscribed_emails WHERE email = ?").get(email);
    
    if (exist){
        console.log("Email is unsubscribed:" + email);
        throw new Error("Email is unsubscribed");
    };
    
    const existingEntry = db.prepare("SELECT * FROM email_tracking WHERE email = ? AND email_type = ?").get(email, emailType);
    
    if (existingEntry) {
        // Si ya existe, incrementar contador y actualizar timestamp, IP y User-Agent
        db.prepare(`
            UPDATE email_tracking 
            SET count = count + 1, opened_at = CURRENT_TIMESTAMP, ip = ?, user_agent = ?
            WHERE email = ? AND email_type = ?
        `).run(ip, userAgent, email, emailType);
    } else {
        // Si no existe, insertar un nuevo registro con count = 1
        db.prepare(`
            INSERT INTO email_tracking (email, email_type, ip, user_agent, count) 
            VALUES (?, ?, ?, ?, 1)
        `).run(email, emailType, ip, userAgent);
    }
};

// Función para obtener todos los emails abiertos
export const getOpenedEmails = () => {
    return db.prepare("SELECT * FROM email_tracking ORDER BY opened_at DESC").all();
};
 

export const unsubscribeEmail = (email: string) => {
    db.prepare("INSERT INTO unsubscribed_emails (email) VALUES (?)").run(email);
    console.log("Email unsubscribed:", email);
}

export const getUnsubscribedEmails = () => {
    return db.prepare("SELECT * FROM unsubscribed_emails").all();
}