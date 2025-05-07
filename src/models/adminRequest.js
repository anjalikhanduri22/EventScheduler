const mongoose = require("mongoose");
const adminRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      ref: "User",
      enum: ["Admin", "User"],
      // Two types of roles
      default: "Admin", // Default role is 'Admin'
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

const AdminRequest = new mongoose.model("AdminRequest", adminRequestSchema);
module.exports = AdminRequest;
