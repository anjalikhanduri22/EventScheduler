const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { adminAuth } = require("../middlewares/adminAuth");

//get all events

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a new event

router.post("/admin/event", adminAuth, async (req, res) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete an event

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    console.log("delete route called");
    await Event.findByIdAndDelete(req.params.id);
    console.log("event deleted");
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update an event by id

router.put("/:id", adminAuth, async (req, res) => {
  const eventId = req.params.id;
  const { title, date, description, location } = req.body;

  try {
    //find the event in the database using id
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //update the event properties
    event.date = date;
    event.title = title;
    event.description = description;
    event.location = location;

    console.log("event updated");
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
