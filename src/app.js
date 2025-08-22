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

// app.get("/hello/2", (req, res) => {
//   res.send({
//     name: "juabir",
//     age: 22,
//   });
// });

// app.post("/hello", (req, res) => {
//   res.send({
//     name: "juabir",
//     age: 22,
//   });
// });

app.get("/hello", (req, res) => {
  res.send("deleted hello successfully");
});


app.get("/hello/2", (req, res) => {
  res.send("deleted successfully");
});


app.use("/test/2", (req, res) => {
  res.send("4nd server code");            // app.use route handler can handle all HTTP methods
});

app.use("/test", (req, res) => {
  res.send("2nd server code");
});

// app.use("/server", (req, res) => {
//   res.send("3nd server code");
// });

// app.get("/user", (req, res) => {
//   console.log(req.query)
//   res.send("5nd server post code");
// });

// //dynmcaic route
// app.get("/user/:id", (req, res) => {
//   console.log(req.params);
//   res.send("6nd server post code");
// });

// app.use("/", (req, res) => {
//   res.send("1st server code"); // network handler
// });

// app.use(
//   "/user",
//   (res, req, next) => {
//     console.log("handlinq user request 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("handlinq user request 2");
//     next();
//   },
//   (req, res) => {
//     console.log("handlinq user request 3");
//     //res.send("user request handled");
//     next();
//   },
//   (req, res) => {
//     console.log("This will not be executed because response is sent");
//     //res.send("This will not be sent");
//     next();S
//   },
//   (err, req, res, next) => {
//     console.error("Error occurred:", err);
//     //res.status(500).send("Internal Server Error");
//     next();
//   },
//   (req, res) => {
//     res.send("Final response after all middleware");
//   }
// );

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});