const express = require("express");
const router = express.Router();
const Event = require("../models/event");

//get all events

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a new event
router.post("/", async (req, res) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    reminder: req.body.reminder || false,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete an event

router.delete("/:id", async (req, res) => {
  try {
    console.log("delete route called");
    await Event.findByIdAndDelete(req.params.id);
    console.log("event deleted");
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
