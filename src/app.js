const connectDb = require("./config/database");
const router = require("./routes/eventRoutes");

const express = require("express");

const app = express();
app.use(express.json());

app.use("/", router);

connectDb()
  .then(() => {
    console.log("connected with database sucessfully");
    app.listen(3000, () => {
      console.log("server is on");
    });
  })
  .catch((err) => {
    console.error(err);
  });
