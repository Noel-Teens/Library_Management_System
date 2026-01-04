const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  membership: String
});

module.exports = mongoose.model("Customer", customerSchema);
