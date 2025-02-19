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
git clone https://github.com/your-username/email-tracking-ts.git
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

## 🚀 Deployment (DigitalOcean)
1️⃣ **Create a VPS (Ubuntu 20.04 LTS recommended).**  
2️⃣ **Install Node.js & Git:**
```bash
sudo apt update && sudo apt install -y nodejs npm git
```
3️⃣ **Clone your project:**
```bash
git clone https://github.com/your-username/email-tracking-ts.git
cd email-tracking-ts
npm install
```
4️⃣ **Start the server with PM2:**
```bash
npm install -g pm2
pm run build
pm start
pm2 start dist/server.js --name tracking-email
pm2 save
```
5️⃣ **Allow incoming connections:**
```bash
sudo ufw allow 3000/tcp
```
6️⃣ **Your server is now live! 🎉**  
Test it with:
```bash
curl http://your-server-ip:3000/track-email?email=test@example.com
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

