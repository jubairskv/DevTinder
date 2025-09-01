const express = require("express");
const connectDB = require("./config/database"); // Import the database connection setup
const User = require("./models/user"); // Import the User model
//const { AuthAdmin, AuthUser } = require("./middlewares/auth"); // Import the User model
const { validateSignUpData } = require("./utils/Validators");
const cookieParser = require("cookie-parser"); // Import the cookie-parser middleware
const { userAuth } = require("./middleware/auth");
const bcrypt = require("bcrypt");

const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const authRouter = require("./routes/auth");

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies convert JSON to JS object
app.use(cookieParser()); // Middleware to parse cookies from incoming requests
app.use("/", authRouter); // Use the auth router for authentication routes
app.use("/", profileRouter);
app.use("/", requestRouter);

// Creating a new instance of User model and saving to DB
// app.post("/signUp", async (req, res) => {
//   console.log(req.body);
//   //   const user = new User({
//   //     firstName: "Arvind",
//   //     lastName: "S",
//   //     emailId: "arvind@gmail.com",
//   //     password: "Arvind@123",
//   //     age: 24,
//   //     gender: "Male",
//   //   });

//   try {
//     validateSignUpData(req); // Validate the sign-up data
//     const { password, firstName, lastName, emailId } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10); // Encrypt the password with a salt round of 10
//     console.log("Password Hash:", passwordHash);

//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     }); // Create a new User instance with data from request body
//     await user.save();
//     res.send("User Added Successfully");
//   } catch (err) {
//     console.error("Error saving user:", err);
//     res.status(500).send("Error saving the user : " + err.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId });
//     if (!user) {
//       //return res.status(400).send("User not found");
//       throw new Error("Invalid Credentials");
//     }
//     const isPasswordvalid = await user.validatePassword(password);

//     if (isPasswordvalid) {
//       //return res.status(400).send("Invalid Password");

//       // Create a JWT Token
//       const Token = await user.getJWT();

//       console.log("JWT Token:", Token);

//       // Add the token to cookies or send the response back to the user
//       res.cookie(
//         "token",
//         Token,
//         { httpOnly: true, secure: true },
//         { expires: new Date(Date.now() + 1 * 3600000) } // Cookie expires in 1 hours
//       );
//       res.send("User logged in successfully");
//     } else {
//       throw new Error("Invalid Credentials");
//     }
//   } catch (err) {
//     console.error("Error logging in user:", err);
//     res.status(500).send("Error: " + err.message);
//   }
// });

// app.get("/profile", userAuth, async (req, res) => {
//   console.log(req.user);
//   try {
//     const user = req.user; // Assuming user is attached to req in auth middleware
//     res.send(user);
//   } catch (err) {
//     console.error("Error fetching profile:", err);
//     res.status(400).send("Error: " + err.message);
//   }
// });

// app.post("/sendConnection", userAuth, async (req, res) => {
//   try {
//     res.send(req.user.firstName + " " + "Connection request sent successfully");
//   } catch (err) {
//     console.error("Error sending connection request:", err);
//     res.status(400).send("Error: " + err.message);
//   }
// });

// //get user by email
// app.get("/getUsers", async (req, res) => {
//   console.log(req.body);
//   const userEmail = req.body.emailId;
//   console.log("Fetching users with email:", userEmail);

//   try {
//     const users = await User.findOne({ emailId: userEmail }); // Fetch all users from the database
//     if (users.length === 0) {
//       return res.status(404).send("No users found with the provided email.");
//     } else {
//       console.log("Users fetched:", users);
//       res.send(users);
//     }
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).send("Error fetching users: " + err.message);
//   }
// });

// // get all users - Feed API
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       return res.status(404).send("No users found.");
//     } else {
//       console.log("Users fetched:", users);
//       res.send(users);
//     }
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).send("Error fetching users: " + err.message);
//   }
// });

// //Delete user by id:
// app.delete("/user", async (req, res) => {
//   const userId = req.body.id;
//   try {
//     //const UserId = await User.findByIdAndDelete(userId); // both works same like shorthand
//     const UserId = await User.findByIdAndDelete({ _id: userId });
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

// app.patch("/user/:id", async (req, res) => {
//   const userId = req.params.id;
//   const data = req.body;
//   try {
//     const ALLOWDUPDATES = ["about", "skills", "photoUrl", "gender", "age"];

//     const isAllowedUpdates = Object.keys(data).every((key) =>
//       ALLOWDUPDATES.includes(key)
//     );

//     if (!isAllowedUpdates) {
//       //return res.status(400).send("Invalid updates");
//       throw new Error("Invalid updates!");
//     }

//     if (data.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     //const User = await User.findByIdAndUpdate(userId, data, );
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//     }); // both works same like shorthand
//     console.log("Updated user:", user);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(500).send("Update Failed: " + err.message);
//   }
// });

// app.patch("/user/email", async (req, res) => {
//   const userEmail = req.body.emailId;
//   const data = req.body;
//   try {
//     //const User = await User.findByIdAndUpdate(userId, data, );
//     const user = await User.findOneAndUpdate({ emailId: userEmail }, data, {
//       returnDocument: "after",
//       runValidators: true, // to run schema validations on update
//     }); // both works same like shorthand
//     console.log("Updated user:", user);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// app.get("/ab*c", (req, res) => {
//   res.send("literal ? route");
// });

// app.get("/a/", (req, res) => {
//   res.send("regex /a/ route");
// });

// app.get(/.*fly$/ , (req, res) => {
//   res.send("regex /.*fly$/ route");
// });

// app.get("/user/:id", (req, res) => {
//   res.send(`User ID is: ${req.params.id}`); // Use req.params.id to access the user ID
// });

// app.get("/user", (req, res) => {
//   console.log(req.query); // Log the query parameters to the console
//   // Access the user ID from query parameters
//   res.send(`User ID is: ${req.query.userId}`); // Use req.query.userId to access the user ID from query parameters
// });

// app.get("/user", (req, res) => {
//   console.log(req.query); // Log the query parameters to the console
//   // Access the user ID from query parameters
//   res.send(`User ID is: ${req.query.userId} ${req.query.password}`); // Use req.query.userId to access the user ID from query parameters
// });

//dynamic route parameters
// app.get("/user/:id", (req, res) => {
//   console.log(req.params); // Log the route parameters to the console
//   // Access the user ID from route parameters
//   res.send("User ID is " + req.params.id);
// });

// app.get("/user/:id/:name/:password", (req, res) => {
//   console.log(req.params); // Log the route parameters to the console
//   // Access the user ID from route parameters
//   res.send("User ID is " + req.params.id);
// });

//

//app.use("/route" , rH1 , [rH2 , rH3] , rH4 , rH5);   // araay of route handles

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling /user request...");
//     next();
//     //res.send("Response!!!");
//     //next();
//   },
//   (req, res, next) => {
//     console.log("2nd handler for /user");
//     //res.send("2nd Response");
//     next();
//   },
//   (req, res, next) => {
//     console.log("3nd handler for /user");
//     //res.send("3nd Response");
//     next();
//   },
//   [
//     (req, res, next) => {
//       console.log("4nd handler for /user");
//       //res.send("4nd Response");
//       next();
//     },
//     (req, res) => {
//       console.log("5nd handler for /user");
//       res.send("5nd Response");
//       // next();
//     },
//   ]
// );

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("First handler for /user");
//     //res.send("First Response");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Third handler for /user"); // res.send("Third Response")
//     res.send("Third Response");
//     // No next() here, so the chain ends  ;
//   }
// );

// app.get("/user", (req, res, next) => {
//   console.log("Second handler for /user");
//   //res.send("Second Response");
//   next();
// });

//Middleware for all routes:

// it will check for all the routes starting with "/" app.xxx() matching
// it will execute first before any route handler

// app.use("/", (req, res, next) => {
//   console.log("Middleware for all routes");
//   //res.send("Response from middleware for all routes");
//   next();
// });

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handler for /user route");
//     //res.send("Response from handler for /user route");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Second handler for /user route");
//     // res.send("Response from second handler for /user route"); // this will throw error as response is already sent
//     next();
//   },
//   (req, res) => {
//     console.log("Third handler for /user route");
//     res.send("Response from third handler for /user route");
//   }
// );

// Middleware for specific route prefix
// app.use("/admin", (req, res, next) => {
//   console.log("Admin Middleware called");
//   //res.send("Response from admin middleware");
//   const token = "xyzzzz";
//   const isAdmin = token === "xyzzzz"; // Example check for admin token
//   if (!isAdmin) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// });

//app.use("/admin", AuthAdmin);

// app.get("/user", AuthUser, (req, res) => {
//   console.log("User Middleware called");
//   res.send("User Route");
// });

// app.get("/user", (req, res) => {
//   //logic to fetching user
//   res.send("User Route");
// });

// app.get("/admin/getAllData", (req, res) => {
//   //logic to fetching  all data
//   res.send("All Data fetched");
// });

// app.get("/admin/deleteuser", (req, res) => {
//   //logic to delete all data
//   res.send("All Data deleted");
// });

// app.post("/user/login", (req, res) => {
//   //logic to delete all data
//   res.send("User logged in successfully");
// });

// app.use("/", (err, req, res, next) => {
//   console.error("Global error handler:", err);
//   res.status(500).send("Internal Server Error: " + err.message);
// });

// app.get("/admin/getAllData", AuthAdmin, (req, res) => {
//   //logic to fetching  all data
//   //  try {
//   throw new Error("Some error occurred while fetching data");
//   res.send("All Data fetched");
//   //} catch (err) {
//   console.error(err);
//   // res.status(500).send("Internal Server Error: " + err.message);
//   //}
// });

// app.use("/", (err, req, res, next) => {
//   console.error("Global error handler:", err);
//   res.status(500).send("Internal Server Error: " + err.message);
// });

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
