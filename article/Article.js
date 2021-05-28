const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  text: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
