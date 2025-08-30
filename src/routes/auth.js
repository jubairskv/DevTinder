const express = require("express");

// const app = express();
// const router = express.Router();

const authRouter = express.Router();

// Creating a new instance of User model and saving to DB
authRouter.post("/signUp", async (req, res) => {
  console.log(req.body);
  //   const user = new User({
  //     firstName: "Arvind",
  //     lastName: "S",
  //     emailId: "arvind@gmail.com",
  //     password: "Arvind@123",
  //     age: 24,
  //     gender: "Male",
  //   });

  try {
    validateSignUpData(req); // Validate the sign-up data
    const { password, firstName, lastName, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // Encrypt the password with a salt round of 10
    console.log("Password Hash:", passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // Create a new User instance with data from request body
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving the user : " + err.message);
  }
});

module.exports = authRouter;
