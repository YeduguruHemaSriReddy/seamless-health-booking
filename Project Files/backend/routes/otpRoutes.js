const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const OTP = require("../models/otpModel");
const sendEmail = require("../utils/sendMail");

// ➤ Send OTP to email
router.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    await OTP.create({ email, otp });

    await sendEmail({
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});


// ➤ Verify OTP
router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;
  console.log("🔐 Incoming verify request:", { email, otp });

  if (!email || !otp) {
    console.log("❌ Missing email or otp");
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const record = await OTP.findOne({ email, otp });

  if (!record) {
    console.log("❌ No OTP found for:", email);
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await OTP.deleteMany({ email });
  res.json({ success: true, message: "OTP verified" });
});

module.exports = router;
