const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Message = require("../models/Message");

/**
 * @desc   Create Complaint
 * @route  POST /api/users/:userId/complaints
 */
exports.createComplaint = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.userType !== "Ordinary") {
      return res.status(404).json({ message: "User not found" });
    }

    const complaint = await Complaint.create({
      ...req.body,
      userId,
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};

/**
 * @desc   Get My Complaints
 * @route  GET /api/users/:userId/complaints
 */
exports.getMyComplaints = async (req, res) => {
  try {
    const { userId } = req.params;

    const complaints = await Complaint.find({ userId });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve complaints" });
  }
};

/**
 * @desc   Update My Profile
 * @route  PUT /api/users/:userId
 */
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

/**
 * @desc   Send Message
 * @route  POST /api/users/messages
 */
exports.sendMessage = async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;

    const newMessage = await Message.create({
      name,
      message,
      complaintId,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

/**
 * @desc   Get Messages for Complaint
 * @route  GET /api/users/messages/:complaintId
 */
exports.getMessages = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const messages = await Message.find({ complaintId })
      .sort("-createdAt");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve messages" });
  }
};
