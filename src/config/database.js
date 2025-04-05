const mongoose = require("mongoose");
const express = require("express");

const app = express();

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://benjwalanji:benjwalanji@cluster0.w9kdkbm.mongodb.net/Events"
  );
};

module.exports = connectDb;
