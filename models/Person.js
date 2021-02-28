const mongoose = require("mongoose");
const schema = mongoose.Schema;

const personSchema = schema({
  firstname: {
    type: String,
    required: "Fist name is required!",
  },
  lastname: {
    type: String,
    required: "Last name is required!",
  },
  industry: {
    type: String,
    required: "Industry is required!",
  },
  jobposition: {
    type: String,
    required: "Job Position is required!" 
  },
  phone: {
    type: String,
    required: "Phone is required!",
  },
  salary: {
    type: String,
    required: "Salary is required!",
  },
  latitude: {
    type: Number,
    required: "Latitude is required!",
  },
  longitude: {
    type: Number,
    required: "Longitude is required!",
  },
  photo: {
    type: String,
    required: "Photo name is required!",
  },
});

module.exports = mongoose.model("Person", personSchema);