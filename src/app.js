const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("server is on");
});

app.use((req, res) => {
  res.send("hello from the server");
});
