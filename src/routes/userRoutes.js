const { userAuth } = require("../middlewares/auth");
const AdminRequest = require("../models/adminRequest");
const Registration = require("../models/registration");

const express = require("express");

const userRouter = express.Router();

//to send a event booking registration request

userRouter.post("/send/eventRequest/:eventId", userAuth, async (req, res) => {
  const fromUserId = req.user._id;
  const eventId = req.params.eventId;
  const userId = fromUserId;

  try {
    const existingEventRequest = await Registration.findOne({
      userId: fromUserId,
      eventId,
    });
    if (existingEventRequest) {
      return res
        .status(400)
        .send({ message: "Event Request Already Exists!!" });
    }

    const eventRequest = new Registration({
      eventId,
      userId,

      createdAt: new Date(),
    });
    const data = await eventRequest.save();

    res.status(201).json({ message: "Request sent successfully", data });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//to send a admin access request

userRouter.post("/send/adminRequest", userAuth, async (req, res) => {
  const fromUserId = req.user._id;

  const status = "pending";

  try {
    const allowedStatus = "pending";
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type: " + status });
    }

    const existingAdminRequest = await AdminRequest.findOne({
      fromUserId,
    });
    if (existingAdminRequest) {
      return res
        .status(400)
        .send({ message: "Admin Request Already Exists!!" });
    }

    const adminRequest = new AdminRequest({
      fromUserId,

      status,
      createdAt: new Date(),
    });
    const data = await adminRequest.save();

    res.status(201).json({ message: "Request sent successfully", data });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//view his/her booking details

userRouter.get("/user/view/allevents", userAuth, async (req, res) => {
  const fromUserId = req.user._id;
  try {
    const allevents = await Registration.find({
      userId: fromUserId,
    }).populate("eventId", ["title", "location", "date"]);
    res.json({
      message: "Data fetched successfully",
      data: allevents,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
