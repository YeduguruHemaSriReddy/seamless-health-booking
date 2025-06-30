
# 🖥️ DocSpot Frontend

This is the frontend of **DocSpot**, a seamless doctor appointment booking system built using **React.js**.  
The user interface provides different portals for Patients, Doctors, and Admins to interact with the healthcare platform efficiently.

---

## 🚀 Features

- User Registration & Login
- Doctor listing and filtering
- Appointment booking with document upload
- Real-time status updates and notifications
- Role-based dashboards:
  - **Patient**: Book/manage appointments
  - **Doctor**: View/approve appointments, access patient info
  - **Admin**: Approve doctors, manage platform

---

## 🧑‍💻 Tech Stack

- **React.js**
- **Material UI**, **Bootstrap**
- **Axios** (API communication)
- **React Router** (Routing)
- **State Management** using React Hooks

---

## 📁 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page views like Login, Dashboard, etc.
│   ├── services/        # Axios services for API
│   └── App.js
├── .env
└── package.json
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js and npm
- Backend running on port `5000`

### 📦 Installation

```bash
cd frontend
npm install
```

### 🚀 Run the App

```bash
npm start
```

Access the app at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file in the `frontend/` directory:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🌐 Deployment

Frontend can be deployed using:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

---

## 👨‍🎓 Developed By
  
Frontend Developer | React Enthusiast 💻✨
