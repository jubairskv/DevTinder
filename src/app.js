const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("1st server code");    // network handler
});

app.use("/test", (req, res) => {
  res.send("2nd server code");
});

app.use("/server", (req, res) => {
  res.send("3nd server code");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
