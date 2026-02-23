const User = require("../models/User");
const Complaint = require("../models/Complaint");
const AssignedComplaint = require("../models/AssignedComplaint");

/**
 * @desc   Get all agents
 * @route  GET /api/admin/agents
 */
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ userType: "Agent" });

    res.json(agents);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch agents",
    });
  }
};

/**
 * @desc   Get all ordinary users
 * @route  GET /api/admin/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: "Ordinary" });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

/**
 * @desc   Get single agent by ID
 * @route  GET /api/admin/agents/:agentId
 */
exports.getAgentById = async (req, res) => {
  try {
    const { agentId } = req.params;

    const agent = await User.findById(agentId);

    if (!agent || agent.userType !== "Agent") {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    res.json(agent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch agent",
    });
  }
};

/**
 * @desc   Delete ordinary user
 * @route  DELETE /api/admin/users/:userId
 */
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user || user.userType !== "Ordinary") {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);
    await Complaint.deleteMany({ userId });

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

/**
 * @desc   Get all complaints
 * @route  GET /api/admin/complaints
 */
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};

/**
 * @desc   Assign complaint to agent
 * @route  POST /api/admin/assign
 */
exports.assignComplaint = async (req, res) => {
  try {
    const { agentId, complaintId } = req.body;

    const agent = await User.findById(agentId);
    if (!agent || agent.userType !== "Agent") {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const assignment = await AssignedComplaint.create({
      agentId,
      complaintId,
      agentName: agent.name,
      status: "assigned",
    });

    // Also update complaint status
    complaint.status = "assigned";
    await complaint.save();

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to assign complaint",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
    });
  }
};
