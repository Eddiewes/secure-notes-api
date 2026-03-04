const express = require("express");
const authController = require("./controllers/authController");
const notesController = require("./controllers/notesController");
const authMiddleware = require("./middleware/auth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/notes", authMiddleware, notesController.createNote);
router.get("/notes", authMiddleware, notesController.getNotes);


router.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

module.exports = router;