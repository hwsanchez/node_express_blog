const mongoose = require('mongoose')
//Models are defined with the Schema interface
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  // username: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datePosted: { /* we declare property type with an object like this because we need a 'default' */
    type: Date,
    default: new Date()
  },
  //string variable for the file path name:
  image: String
});

//We access the database via mongoose.model: the first argument is the name of the collection
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// We need to export the variable so is accesible to other files.
module.exports = BlogPost
