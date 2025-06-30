
# 🛠️ DocSpot Backend

This is the backend of **DocSpot**, a seamless doctor appointment booking system developed using **Node.js**, **Express.js**, and **MongoDB**.  
It handles core functionalities such as authentication, appointment management, doctor verification, and admin operations.

---

## 🚀 Features

- User & Doctor registration and login (JWT-based)
- Role-based access: Patient, Doctor, Admin
- CRUD operations for appointments and profiles
- File uploads (Multer) for medical records
- Admin approval system for doctors
- Email/SMS notification support (integration-ready)
- Secure password hashing using Bcrypt

---

## 🧑‍💻 Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Moment.js** for date/time handling
- **dotenv**, **cors**, **nodemon**

---

## 📁 Folder Structure

```
backend/
├── config/            # MongoDB connection and config
├── controllers/       # Request handlers
├── models/            # Mongoose schemas (User, Doctor, Appointment)
├── routes/            # API routes (auth, user, doctor, admin)
├── middleware/        # Auth middleware, error handling
├── uploads/           # Directory for uploaded files
├── server.js          # Entry point
└── .env               # Environment variables
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)

### 📦 Installation

```bash
cd backend
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/doctor_appointment
JWT_SECRET=your_jwt_secret_key
```

### 🚀 Run the Server

```bash
npm run dev
```

API will be accessible at: [http://localhost:5000](http://localhost:5000)

---

## 📬 API Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login`    | POST | Login user |
| `/api/doctors`       | GET/POST/PUT | Doctor operations |
| `/api/appointments`  | GET/POST | Book/manage appointments |
| `/api/admin`         | GET/POST | Admin controls |

---

## 🧪 Testing

- Use Postman to test all routes
- Test auth with JWT tokens in headers
- Upload test files using appointment endpoints

---

## 🌐 Deployment

Backend can be deployed using:
- [Render](https://render.com/)
- [Heroku](https://www.heroku.com/)
- MongoDB Atlas for remote DB

---

## 👨‍🎓 Developed By

Backend Developer | Node.js | REST API Specialist ⚙️🌍
