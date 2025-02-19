# 📩 Email Tracking System (TypeScript + SQLite)

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

