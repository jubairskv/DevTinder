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

app.use("/", (req, res, next) => {
  console.log("Middleware for all routes");
  //res.send("Response from middleware for all routes");
  next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handler for /user route");
    //res.send("Response from handler for /user route");
    next();
  },
  (req, res, next) => {
    console.log("Second handler for /user route");
    // res.send("Response from second handler for /user route"); // this will throw error as response is already sent
    next();
  },
  (req, res) => {
    console.log("Third handler for /user route");
    res.send("Response from third handler for /user route");
  }
);

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
