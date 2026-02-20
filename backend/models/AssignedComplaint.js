const mongoose = require("mongoose");

const assignedComplaintSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    status: {
      type: String,
      enum: ["assigned", "completed"],
      default: "assigned",
    },
    agentName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssignedComplaint", assignedComplaintSchema);
