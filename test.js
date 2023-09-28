const mongoose = require("mongoose");
//Importing my mongoose model:
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

// creating a new document in MongoDB collection: my_database
//You need to first start the connection with Mongo you need to run MongoDB:
// type the following at the prompt: mongod --config /opt/homebrew/etc/mongod.conf

//Creating documents in the Mongo DB:
// BlogPost.create({
//   title: "Surfing in LaCanau/Bordeaux",
//   body: "Una playa impresionantemente gigantesca, con olas magnificas para el surf: LaCanau a 50 min de Bordeaux, France. Vamono pa' ya!"
// }).then((blogpost) => {
//   console.log(blogpost);
// }).catch((error) => {
//   console.log(error)
// })

// BlogPost.create({
//   title: "Fresh Fish at The Fischmarkt in Hamburg",
//   body: "Hay que ir al Fischmarkt en Hamburg, donde encontraras el pescado mas fresco en Hamburgo a los mejore precios!"
// }).then((blogpost) => {
//   console.log(blogpost);
// }).catch((error) => {
//   console.log(error);
// })

//Reading all documents from MongoDB:

// BlogPost.find({ title: /^The/ })
//   .then((blogposts) => {
//     console.log('All doc starting w "The": ');
//     console.log(blogposts);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Finding by id:
var id = "650efcc8372511384fb90bed";
BlogPost.findById(id)
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.error(error);
  });

// Updating Records:
var id2 = "651013970f9074079eb6a970";
BlogPost.findByIdAndUpdate(
  id2,
  { title: "Jajajajaja! Pescao en Hamburgo!" },
  { new: true }
)
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.error(error);
  });

//Deleting Single Record:

var id3 = "650ef53832d45bb3c1bbfa95";
BlogPost.findByIdAndDelete(id3)
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.error(error);
  });
