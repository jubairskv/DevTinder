const express = require("express");
//const connectDB = require("./config/database"); // Import the database connection setup
//const User = require("./models/user"); // Import the User model

const app = express();

// app.post("/signUp", async (req, res) => {
//   const user = new User({
//     firstName: "Arvind",
//     lastName: "S",
//     emailId: "arvind@gmail.com",
//     password: "Arvind@123",
//     age: 24,
//     gender: "Male",
//   });

//   try {
//     await user.save();
//     res.send("User Added Successfully");
//   } catch (err) {
//     console.error("Error saving user:", err);
//     res.status(500).send("Error saving the user : " + err.message);
//   }
// });

// connectDB()
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(7777, () => {
//       console.log("Server is running on port 7777");
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

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

app.get("/user/:id/:name/:password", (req, res) => {
  console.log(req.params); // Log the route parameters to the console
  // Access the user ID from route parameters
  res.send("User ID is " + req.params.id);
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
