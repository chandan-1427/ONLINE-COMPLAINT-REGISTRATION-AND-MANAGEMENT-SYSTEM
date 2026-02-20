const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create complaint
router.post("/:userId/complaints", userController.createComplaint);

// Get my complaints
router.get("/:userId/complaints", userController.getMyComplaints);

// Update profile
router.put("/:userId", userController.updateProfile);

// Messaging
router.post("/messages", userController.sendMessage);
router.get("/messages/:complaintId", userController.getMessages);

module.exports = router;
