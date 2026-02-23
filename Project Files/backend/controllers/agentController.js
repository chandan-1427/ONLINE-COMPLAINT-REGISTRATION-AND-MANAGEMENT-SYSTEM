const User = require("../models/User");
const Complaint = require("../models/Complaint");
const AssignedComplaint = require("../models/AssignedComplaint");

/**
 * @desc   Get all complaints assigned to agent
 * @route  GET /api/agent/:agentId/complaints
 */
exports.getAssignedComplaints = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Verify agent exists
    const agent = await User.findById(agentId);
    if (!agent || agent.userType !== "Agent") {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Get assigned complaint records
    const assignedComplaints = await AssignedComplaint.find({
      agentId,
    });

    const complaintIds = assignedComplaints.map(
      (item) => item.complaintId
    );

    const complaints = await Complaint.find({
      _id: { $in: complaintIds },
    });

    res.json(complaints);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve assigned complaints",
    });
  }
};

/**
 * @desc   Update complaint status (Agent)
 * @route  PUT /api/agent/complaints/:complaintId
 */
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    // Update main complaint
    const updatedComplaint =
      await Complaint.findByIdAndUpdate(
        complaintId,
        { status },
        { new: true }
      );

    // Update assigned complaint record
    await AssignedComplaint.findOneAndUpdate(
      { complaintId },
      { status }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json(updatedComplaint);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update complaint status",
    });
  }
};
