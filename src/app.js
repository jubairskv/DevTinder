const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send({
    name: "juabir",
    age: 22,
  });
});

app.post("/hello", (req, res) => {
  res.send({
    name: "juabir",
    age: 22,
  });
});

app.delete("/hello", (req, res) => {
  res.send("deleted successfully");
});

app.use("/test/2", (req, res) => {
  res.send("4nd server code");
});

app.use("/test", (req, res) => {
  res.send("2nd server code");
});

app.use("/server", (req, res) => {
  res.send("3nd server code");
});

app.use("/", (req, res) => {
  res.send("1st server code"); // network handler
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
