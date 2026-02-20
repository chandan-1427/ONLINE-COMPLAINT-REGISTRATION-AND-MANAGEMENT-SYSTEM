const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Get all agents
router.get("/agents", adminController.getAllAgents);

// Get single agent
router.get("/agents/:agentId", adminController.getAgentById);

// Get all ordinary users
router.get("/users", adminController.getAllUsers);

// Delete ordinary user
router.delete("/users/:userId", adminController.deleteUser);

// Get all complaints
router.get("/complaints", adminController.getAllComplaints);

// Assign complaint
router.post("/assign", adminController.assignComplaint);

// Update user
router.put("/users/:userId", adminController.updateUser);

module.exports = router;
