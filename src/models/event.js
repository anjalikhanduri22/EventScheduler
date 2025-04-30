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
      default:
        "https://media.licdn.com/dms/image/v2/D4E12AQEpKCf8Mrrlwg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1662700158263?e=2147483647&v=beta&t=UBGTboG0Et0sRKiODAGmwoJ6x6ejG6Ff0cGtpgkgzHM",
      set: (v) => (v === "" ? undefined : v),
    },
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
