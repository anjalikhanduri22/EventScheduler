const User = require("../models/user"); // Import the user schema
const { adminAuth } = require("../middlewares/adminAuth");
const AdminRequest = require("../models/adminRequest");
const Registration = require("../models/registration");

const express = require("express");
const adminRouter = express.Router();

//to review admin request

adminRouter.post(
  "/request/review/:status/:requestId",
  adminAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const adminRequest = await AdminRequest.findOne({
        _id: requestId,

        status: "pending",
      }).populate("fromUserId", ["name", "email"]);

      if (!adminRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      adminRequest.status = status;

      const data = await adminRequest.save();

      const userId = adminRequest.fromUserId;
      console.log(userId);
      const user = await User.findByIdAndUpdate(userId, { role: "Admin" });

      if (!user) {
        return { message: "User not found" };
      }

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

//to view all pending admin request

adminRouter.get("/admin/requests/received", adminAuth, async (req, res) => {
  try {
    const adminRequests = await AdminRequest.find({
      status: "pending",
      //}).populate("fromUserId", USER_SAFE_DATA);
    }).populate("fromUserId", ["name", "email"]);

    res.json({
      message: "Data fetched successfully",
      data: adminRequests,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

//to view all users in data base(not admin)

adminRouter.get("/admin/view/allusers", adminAuth, async (req, res) => {
  try {
    const users = await User.find({
      role: "User",
      //}).populate("fromUserId", USER_SAFE_DATA);
    });

    res.json({
      message: "Data fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//to review event booking request

adminRouter.post(
  "/event/review/:status/:registrationId",
  adminAuth,
  async (req, res) => {
    try {
      const { status, registrationId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const bookingRequest = await Registration.findOne({
        _id: registrationId,

        status: "intrested",
      });
      if (!bookingRequest) {
        return res.status(404).json({ message: "Booking request not found" });
      }

      bookingRequest.status = status;

      const data = await bookingRequest.save();

      res.json({ message: "Booking request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

//view all users booking details

adminRouter.get("/admin/view/eventsBooking", adminAuth, async (req, res) => {
  try {
    const allevents = await Registration.find({
      status: "accepted",
    })
      .populate("eventId", ["title", "location", "date"])
      .populate("userId", ["name", "email"]);

    res.json({
      message: "Data fetched successfully",
      data: allevents,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//view all pending booking requests

adminRouter.get(
  "/admin/view/pending/eventBookings",
  adminAuth,
  async (req, res) => {
    try {
      const allevents = await Registration.find({
        status: "intrested",
      });
      res.json({
        message: "Data fetched successfully",
        data: allevents,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = adminRouter;
