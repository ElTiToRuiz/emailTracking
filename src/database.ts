import Database from "better-sqlite3";

// Connect to the SQLite database
const db = new Database("database.sqlite");

// Create the email tracking table if it doesn’t exist
db.exec(`
    CREATE TABLE IF NOT EXISTS email_tracking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// Function to track email open
export const trackEmailOpen = (email: string) => {
    const stmt = db.prepare("INSERT INTO email_tracking (email) VALUES (?)");
    stmt.run(email);
};

// Function to get all opened emails
export const getOpenedEmails = () => {
    return db.prepare("SELECT * FROM email_tracking ORDER BY opened_at DESC").all();
};
