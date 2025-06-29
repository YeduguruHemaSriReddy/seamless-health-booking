/* ───────────────────────────────────────────────
   backend/routes/doctorRoutes.js
─────────────────────────────────────────────── */
const express = require("express");
const router  = express.Router();

/* ✅  IMPORT your JWT/auth middleware */
const auth = require("../middlewares/authMiddleware");

/* ✅  Import the controller function */
const { apply } = require("../controllers/doctorController");

/* ────────── ROUTES ────────── */
router.post("/apply", auth, apply);

/* (optional future routes)
// router.get("/approved", getApprovedDoctors);
// router.patch("/approve/:id", authMiddleware, approveDoctor);
*/

module.exports = router;
