const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Person is required!",
      ref: "Person",
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    password: {
      type: String,
      required: "Password is required!",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
