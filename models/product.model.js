const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  image: String,
  price:  Number,
  rating:  Number,
});

module.exports = mongoose.model("products", productSchema);
