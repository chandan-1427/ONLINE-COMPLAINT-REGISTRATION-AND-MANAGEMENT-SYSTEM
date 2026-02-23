const Message = require("../models/Message");

/**
 * @desc   Send Message
 * @route  POST /api/messages
 */
exports.sendMessage = async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;

    if (!name || !message || !complaintId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      message,
      complaintId,
    });

    res.status(201).json(newMessage);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

/**
 * @desc   Get messages by complaint ID
 * @route  GET /api/messages/:complaintId
 */
exports.getMessagesByComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const messages = await Message.find({ complaintId })
      .sort({ createdAt: -1 });

    res.json(messages);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve messages",
    });
  }
};
