const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/complaintDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));
