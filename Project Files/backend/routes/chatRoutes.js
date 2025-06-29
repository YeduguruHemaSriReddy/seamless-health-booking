const express = require("express");
const router  = express.Router();
const Chat    = require("../models/chatModel");

/* GET /api/chat/:room  →  full history */
router.get("/:room", async (req, res) => {
  try {
    const msgs = await Chat.find({ room: req.params.room }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST /api/chat  →  save one message */
router.post("/", async (req, res) => {
  try {
    const saved = await Chat.create(req.body);   // { room, sender, text }
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
