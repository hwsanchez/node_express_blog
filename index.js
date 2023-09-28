const express = require("express");
const path = require("path");
const app = new express();
app.use(express.static("public"));

// for saving posts:
const BlogPost = require("./models/BlogPost.js");

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

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  // Previously, we responded like this to a get request:
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'))

  // Now with EJS:
  res.render("index", { blogposts: blogposts });
  console.log(blogposts);
});

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
  res.render("about");
});

app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", { blogpost });
  console.log(req.params);
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

//Saving documents in the MongoDB:

//app.post("/posts/store", (req, res) => {
// console.log(req.body); we have all form input in req.body object

// BlogPost.create(req.body)
//   .then((blogpost) => {
// res.redirect("/"); this redirect the app to home after form input
// })
// .catch((error) => {
//   console.error(error);
// });

// console.log('Titulo: ' + req.body.title) you can also access individual
// console.log('Descripcion: ' + req.body.body)
// });

// more elegant way using async function:
app.post("/posts/store", async (req, res) => {
  //Here image is the same name from the form input in create.ejs:
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await BlogPost.create({...req.body, image: '/img/' + image.name});
    console.log(req.body);
    res.redirect("/");
  });
});

app.listen(4000, () => {
  console.log("Listening on port 4000...");
});
