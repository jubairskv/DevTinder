const express = require("express");
const connectDB = require("./config/database"); // Import the database connection setup
const User = require("./models/user"); // Import the User model
//const { AuthAdmin, AuthUser } = require("./middlewares/auth"); // Import the User model

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies convert JSON to JS object

// Creating a new instance of User model and saving to DB
app.post("/signUp", async (req, res) => {
  console.log(req.body);
  //   const user = new User({
  //     firstName: "Arvind",
  //     lastName: "S",
  //     emailId: "arvind@gmail.com",
  //     password: "Arvind@123",
  //     age: 24,
  //     gender: "Male",
  //   });

  const user = new User(req.body); // Create a new User instance with data from request body
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving the user : " + err.message);
  }
});

//get user by email
app.get("/getUsers", async (req, res) => {
  console.log(req.body);
  const userEmail = req.body.emailId;
  console.log("Fetching users with email:", userEmail);

  try {
    const users = await User.findOne({ emailId: userEmail }); // Fetch all users from the database
    if (users.length === 0) {
      return res.status(404).send("No users found with the provided email.");
    } else {
      console.log("Users fetched:", users);
      res.send(users);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users: " + err.message);
  }
});

// get all users - Feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send("No users found.");
    } else {
      console.log("Users fetched:", users);
      res.send(users);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users: " + err.message);
  }
});

//Delete user by id:
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    //const UserId = await User.findByIdAndDelete(userId); // both works same like shorthand
    const UserId = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;
  try {
    //const User = await User.findByIdAndUpdate(userId, data, );
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    }); // both works same like shorthand
    console.log("Updated user:", user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

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
