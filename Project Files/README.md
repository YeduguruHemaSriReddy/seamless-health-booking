🩺 DocSpot – Seamless Doctor Appointment Booking App
DocSpot is a modern and intuitive MERN Stack-based web application that bridges the gap between patients and healthcare providers. It enables users to browse, book, and manage doctor appointments with real-time availability, while providing doctors and admins with comprehensive tools to handle healthcare appointments efficiently and securely.

🚀 Features
👨‍⚕️ For Patients:
Secure sign-up/login and profile creation
Search and filter doctors by specialty, location, and availability
Book appointments with document upload
Get real-time confirmations, reminders (Email/SMS)
View, reschedule, or cancel bookings via a clean dashboard
🩻 For Doctors:
Dedicated dashboard for managing availability
Confirm, complete, or cancel appointments
Access patient records and post-visit notes
Receive appointment notifications
🛡️ For Admins:
Approve doctor registrations (only verified doctors listed)
Oversee all platform operations
Handle disputes and ensure compliance with policies
Role-based access control
🧑‍💻 Tech Stack
Frontend
React.js
Material UI + Bootstrap + Ant Design
Axios (API requests)
React Router (navigation)
Backend
Node.js + Express.js
MongoDB + Mongoose
JWT (authentication)
Bcrypt (password hashing)
Multer (file uploads)
Moment.js (date/time formatting)
Tools & Libraries
Nodemon (dev server)
CORS, dotenv, concurrently
Email/SMS integration (notifications)
MongoDB Atlas (cloud DB)
Git & GitHub (version control)
📁 Project Structure
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
⚙️ Setup Instructions
🔧 Prerequisites
Node.js and npm
MongoDB (local or Atlas)
Git
🖥️ Installation
Clone the repository

git clone https://github.com/yourusername/docspot.git
cd docspot
Install backend dependencies

cd backend
npm install
Install frontend dependencies

cd ../frontend
npm install
Create .env files

For backend (backend/.env):

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
For frontend (frontend/.env):

REACT_APP_API_URL=http://localhost:5000
Run the app In the root directory:

npm install concurrently --save-dev
npm start
🌐 Deployment
Frontend: Vercel / Netlify
Backend: Render / Heroku
Database: MongoDB Atlas
📸 Screenshots
Landing Page	Doctor Dashboard	Booking Form
Landing	Doctor	Booking
🧪 Testing
Use Postman to test backend APIs
Verify protected routes with JWT
Test appointment flow from booking → confirmation → summary
📚 Resources
Project Flow Demo (Video)
MERN Stack Docs
Ant Design
👨‍💻 Team Members
• Yeduguru HemaSri Reddy (Team Leader)
• Bindu Sree U
• Deepthi B
• Shaik Fouziya
• BM Jamuna

👨‍🎓 Developed By
MERN Stack Developer | Passionate about building solutions that improve lives 🌐💡
