const express = require("express");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  console.log(req.user);
  try {
    const user = req.user; // Assuming user is attached to req in auth middleware
    res.send(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
