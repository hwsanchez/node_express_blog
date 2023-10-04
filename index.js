const express = require("express");
const app = new express();
app.use(express.static("public"));

// registering the route controllers:
const storeUserController = require("./controllers/storeUser");
const newPostController = require("./controllers/newPost");
const newUserController = require("./controllers/newUser");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePosts");
const getPostController = require("./controllers/getPosts");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const expressSession = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware =
  require('./middleware/redirectIfAuthenticatedMiddleware');



// implementing Express Session:
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Setting a global variable to check if the user is logged.
//this variable will be accesible to all .ejs files
global.loggedIn = null;

//"*" is a wild card; on every request the code will be executed.
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
// body parsing middleware to enable getting the form data
//via req.body attribute:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB from Node:
//We define a connection with with mongoose.connect that takes
//the parameters: host and database name. If the Database doesnt exists Mongo will create a new one automatically!
//To define a model(collections in our database) we create a 'models' folder
//in our app directory (BlogPost.js)
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

// importing templating Engine: EJS
const ejs = require("ejs");
app.set("view engine", "ejs");

//setting up Express file-upload:
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use("/posts/store", authMiddleware, storePostController); //we first check if the user is logged in.

app.get("/", homeController);
// Previously, we responded like this to a get request:
// res.sendFile(path.resolve(__dirname, 'pages/index.html'))

app.get("/post/:id", getPostController);

app.get("/posts/new", authMiddleware, newPostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController); // A Pipeline going from left to right where authMiddleware is called before to check if the user is logged in.

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.listen(4000, () => {
  console.log("Listening on port 4000...");
});
