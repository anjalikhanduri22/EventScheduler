const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String, // Location of the event (e.g., address, venue name)
      required: true,
    },
    capacity: {
      type: Number, // Maximum number of attendees
    },

    imageUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png", // URL for the event image/banner
    },
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
