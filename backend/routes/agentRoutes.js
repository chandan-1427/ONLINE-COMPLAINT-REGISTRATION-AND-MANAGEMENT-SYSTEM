const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

// Get complaints assigned to agent
router.get(
  "/:agentId/complaints",
  agentController.getAssignedComplaints
);

// Update complaint status
router.put(
  "/complaints/:complaintId",
  agentController.updateComplaintStatus
);

module.exports = router;
