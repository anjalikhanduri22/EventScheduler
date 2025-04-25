const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: "User", // Links to the User collection
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Event model
    required: true,
    ref: "Event", // Links to the Event collection
  },
  registrationDate: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the record is created
  },
  status: {
    type: String,
    enum: ["intrested", "accepted", "rejected"], // Registration status options
    default: "intrested",
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
