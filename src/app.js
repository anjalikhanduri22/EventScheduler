const connectDb = require("./config/database");
const router = require("./routes/eventRoutes");
const cors = require("cors");
require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", router);

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
