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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      //return res.status(400).send("User not found");
      throw new Error("Invalid Credentials");
    }
    const isPasswordvalid = await user.validatePassword(password);

    if (isPasswordvalid) {
      //return res.status(400).send("Invalid Password");

      // Create a JWT Token
      const Token = await user.getJWT();

      console.log("JWT Token:", Token);

      // Add the token to cookies or send the response back to the user
      res.cookie(
        "token",
        Token,
        { httpOnly: true, secure: true },
        { expires: new Date(Date.now() + 1 * 3600000) } // Cookie expires in 1 hours
      );
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = authRouter;
