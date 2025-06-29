/* ──────────────────────────────────────────────────────────
   server.js • Book‑A‑Doctor Backend
─────────────────────────────────────────────────────────── */

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const dotenv   = require("dotenv");
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
const FRONTEND_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
];
const http     = require("http");
const { Server } = require("socket.io");
const cron     = require("node-cron");

/* ===== Routes & Utilities ===== */
const userRoutes    = require("./routes/userRoutes");
const adminRoutes   = require("./routes/adminRoutes");
const doctorRoutes  = require("./routes/doctorRoutes");
const otpRoutes     = require("./routes/otpRoutes");
const sendReminders = require("./utils/sendReminders");
dotenv.config();

/* ===== Express + HTTP + Socket.IO ===== */
const app    = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
/* ===== Middleware ===== */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);app.use(express.json());

/* ===== API Routes ===== */
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin",   adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/otp",     otpRoutes);

/* ===== Health Check (root) ===== */
app.get("/", (req, res) => {
  res.send("🚀 Book‑A‑Doctor API is running");
});

/* ===== Socket.IO Handlers ===== */
io.on("connection", (socket) => {
  socket.on("join-room", (room) => socket.join(room));

  socket.on("send-message", data => {
  io.to(data.room).emit("receive-message", data);
  new Chat(data).save().catch(console.error);
});


  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* ===== Global Error Logger ===== */
app.use((err, req, res, next) => {
  console.error("🔥 UNHANDLED ERROR:", err);
  // In production, hide stack trace
  const isProd = process.env.NODE_ENV === "production";
  res.status(500).json({
    message: err.message,
    ...(isProd ? null : { stack: err.stack }),
  });
});

/* ===== MongoDB Connection ===== */
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/bookadoctor";
const PORT      = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


/* ===== Cron Job: Appointment Reminders ===== */
cron.schedule("*/5 * * * *", () => {
  console.log("⏰ Running appointment reminder…");
  sendReminders();
});

/* ===== Optional: export io for other modules ===== */
module.exports = { io };
