const connectDb = require("./config/database");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", authRoutes);
app.use("/", eventRoutes);
app.use("/", adminRoutes);
app.use("/", userRoutes);

connectDb()
  .then(() => {
    console.log("connected with database sucessfully");
    app.listen(process.env.PORT, () => {
      console.log("server is on");
    });
  })
  .catch((err) => {
    console.error(err);
  });
