const mongoose = require("mongoose");
const schema = mongoose.Schema;

const rolSchema = schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    required: "User is required!",
    ref: "User",
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    required: "User is required!",
    ref: "User",
  },
  marketstall: {
    type: String,
    required: "Market Stall name is required!",
  }
});

module.exports = mongoose.model("Rol", rolSchema);