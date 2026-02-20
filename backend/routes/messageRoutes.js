const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Send message
router.post("/", messageController.sendMessage);

// Get messages for complaint
router.get("/:complaintId", messageController.getMessagesByComplaint);

module.exports = router;
