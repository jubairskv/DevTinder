- create repository
- initialise the repo
- node_modules , package.json, package-lock.json
- Install express
- Create a server
- Listen to a port 7777
- write request handler for /test , /hello
- install nodemon and update script inside package.json
- what are dependencies
- what is the use of "-g" while npm install
- Differnce between caret and tidle (^ vs ~ )

//Routing and Request Handler

- Initialize git
- gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and route extension ex /hello , / , /hello/2 , /test
- Order of the routes matters a lot
- Install postman app and make a workspace/collection -> test API call
- write logic to handle GET , POST , PATCH , DELETE , API Calls and test then on postman
- Explore routing and use of ? , + , () , \* in the routes
- use of regext in routes /a/ , /.\*fly$/
- how to reading Query , params in the routes
- reading the dynamic routes

// Middlwares and error handlers:

- Multiple Route handlers - play with your code
- next()
- next function and error along with res.send()
- app.use("/route" , rH1 , rH2 , [rH3 ,rH4] , rH5)
- what is middlewares ? why do wee need it
- how express JS basically handles request behind the scenes
- Difference bw app.use() and app.all()
- write a dummy auth middleware for admin
- write a dummy user middleware for userAdmin except /user/login api
- Error handling using app.use("/", (err, req , res , next )=> {}) always handle at ur project

// Database - Schema & Models

- create a free cluster on mongoDB offical website (Mongo atlast)
- Install mongoose library
- Connect your application to the database "Connection-url/devTinder"
- Call the connectDB function and connect to database before statrting application on 7777
- Create user Schemas and user Modal
- Create POST /signUp to add data to database
- push some documents using api calls from postman
- Error handling using try , catch

//Diving into APIS S02-E07:

- Difference Between JS Object and JSON Object
- add express.json() middleware to ur app
- make your signup API dynamic to receieve data from the end user
- user.FindOne with duplicate data check which data returing
- API - get user by email
- API -Feed API - get all user from the database
- Create Delete API using ID
- Differenec between PATCH and PUT
- create update user API
- Explore the mongoose documentation for model methods
- what are options in a model.findOneAndUpdate method , explore more about it
- API update a user using emailId

// Data Sanitization and validation & Schema Validations:

- Explore schemaTypes options from the documentions
- Add require , min , minLength , trim , unique , lowercase  
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate  validations on each field in schema
- Add timestamps to user schema
- Add API level validation on patch  request & SignUp post APi
- Data Sanitizing - Add API Validation for each fields 
