# 📩 Email Tracker System (For Educational Purposes Only)

## ⚠️ **Legal Disclaimer**:
This code was developed **solely for educational and learning purposes**.  
Using this code to track emails without the recipient's consent **may violate privacy laws** in different jurisdictions.  

## **The author is NOT responsible** for any misuse of this tool.  
Each user is responsible for ensuring the legality of their actions in their respective country and accepting any legal consequences that may arise.  

### 🚀 Purpose of This Project:
- To learn and understand how email tracking works.
- For personal statistics and system improvements.
- **NOT** intended for illegal or unethical use.  

### ⚠️ Use Responsibly:
- Always comply with local privacy laws.
- If tracking emails, ensure recipients are aware and have given consent.
- Do not use this tool for malicious purposes.

🔹 **If you are unsure whether you can legally use this tool, consult with a legal expert before proceeding.**  

## 🚀 Overview
This is a **self-hosted email tracking system** built with **TypeScript, Express.js, and SQLite**. It allows you to:
✅ Track email opens via a transparent 1x1 tracking pixel.
✅ Store and retrieve email open data.
✅ Use a simple API to monitor email engagement.

## 🔧 Technologies Used
- **Backend:** TypeScript, Express.js
- **Database:** SQLite (Easily upgradeable to PostgreSQL/MySQL)
- **Testing:** Jest, Supertest
- **Deployment:** DigitalOcean / Any VPS

## 📌 Installation
### 1️⃣ Clone the repository
```bash
git clone https://github.com/ElTiToRuiz/EmailTracking.git
cd email-tracking-ts
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the server
```bash
npm run build
npm start
```

The API will be running on **`http://localhost:3000`** 🚀

## 📊 API Endpoints
### ✅ Track an Email Open
`GET /track-email?email=example@email.com`

- Example:
```bash
curl http://localhost:3000/track-email?email=test@example.com
```
- 📌 Stores an email open event and returns a **1x1 transparent pixel image**.

### ✅ Retrieve Tracked Emails
`GET /opened-emails`

- Example:
```bash
curl http://localhost:3000/opened-emails
```
- 📌 Returns a list of emails that have been opened.

## 🧪 Running Tests
Run all tests:
```bash
npm test
```
Run tests in watch mode:
```bash
npm run test:watch
```
Run test coverage:
```bash
npm run test:coverage
```

## 🔥 Future Improvements
- **Add a React dashboard to visualize email tracking data.**
- **Upgrade SQLite to PostgreSQL or MySQL for scalability.**
- **Secure `/opened-emails` with authentication.**
- **Implement webhooks for real-time email open notifications.**
- **Filter out bot-generated opens using IP/User-Agent detection.**

## 📄 License
MIT License. Feel free to modify and improve!

🚀 **Happy tracking!**

