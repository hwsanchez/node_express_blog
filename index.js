const express = require("express");
const app = new express();
app.use(express.static("public"));

// registering the route controllers:
const storeUserController = require("./controllers/storeUser")
const newPostController = require("./controllers/newPost");
const newUserController = require("./controllers/newUser");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePosts");
const getPostController = require("./controllers/getPosts");


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

app.use("/posts/store", storePostController);

app.get("/", homeController);
// Previously, we responded like this to a get request:
// res.sendFile(path.resolve(__dirname, 'pages/index.html'))

app.get("/post/:id", getPostController);



app.get("/posts/new", newPostController);

app.get("/auth/register", newUserController);

app.post("/users/register", storeUserController);

app.listen(4000, () => {
  console.log("Listening on port 4000...");
});
