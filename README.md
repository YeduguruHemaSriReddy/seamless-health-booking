
# 🩺 DocSpot – Seamless Doctor Appointment Booking App

DocSpot is a modern and intuitive MERN Stack-based web application that bridges the gap between patients and healthcare providers. It enables users to browse, book, and manage doctor appointments with real-time availability, while providing doctors and admins with comprehensive tools to handle healthcare appointments efficiently and securely.

---

## 🚀 Features

### 👨‍⚕️ For Patients:
- Secure sign-up/login and profile creation
- Search and filter doctors by specialty, location, and availability
- Book appointments with document upload
- Get real-time confirmations, reminders (Email/SMS)
- View, reschedule, or cancel bookings via a clean dashboard

### 🩻 For Doctors:
- Dedicated dashboard for managing availability
- Confirm, complete, or cancel appointments
- Access patient records and post-visit notes
- Receive appointment notifications

### 🛡️ For Admins:
- Approve doctor registrations (only verified doctors listed)
- Oversee all platform operations
- Handle disputes and ensure compliance with policies
- Role-based access control

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Material UI + Bootstrap + Ant Design
- Axios (API requests)
- React Router (navigation)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (authentication)
- Bcrypt (password hashing)
- Multer (file uploads)
- Moment.js (date/time formatting)

### Tools & Libraries
- Nodemon (dev server)
- CORS, dotenv, concurrently
- Email/SMS integration (notifications)
- MongoDB Atlas (cloud DB)
- Git & GitHub (version control)

---

## 📁 Project Structure

```
docspot/
├── frontend/             # React App
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── .env
├── backend/              # Express App
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── .env
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Git

### 🖥️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YeduguruHemaSriReddy/seamless-health-booking.git
   cd docspot
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Create `.env` files**

   For backend (`backend/.env`):
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   ```

   For frontend (`frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Run the app**
   In the root directory:
   ```bash
   npm install concurrently --save-dev
   npm start
   ```

---

## 🌐 Deployment

- Frontend: [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)
- Backend: [Render](https://render.com/) / [Heroku](https://www.heroku.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🧪 Testing

- Use Postman to test backend APIs
- Verify protected routes with JWT
- Test appointment flow from booking → confirmation → summary

---

## 📚 Resources

- [Project Flow Demo (Video)](https://drive.google.com/drive/folders/1pteT8STdObONWwELNDHRK9biItLuiJ-1?usp=sharing)
- [MERN Stack Docs](https://www.mongodb.com/languages/mern-stack-tutorial)
- [Ant Design](https://ant.design/)

---

## 👨‍💻 Team Members
  •	Yeduguru HemaSri Reddy (Team Leader) <br>
  •	Bindu Sree U <br>
  •	Deepthi B <br>
  •	Shaik Fouziya <br>
  •	BM Jamuna 
  
---

## 👨‍🎓 Developed By

MERN Stack Developer | Passionate about building solutions that improve lives 🌐💡

---
