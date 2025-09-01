const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnection", userAuth, async (req, res) => {
  try {
    res.send(req.user.firstName + " " + "Connection request sent successfully");
  } catch (err) {
    console.error("Error sending connection request:", err);
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = requestRouter;
