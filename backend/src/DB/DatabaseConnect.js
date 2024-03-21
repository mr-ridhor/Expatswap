const mongoose = require("mongoose");
// const mongoose = require('mongoose');

// Load environment variables from .env file
require("dotenv").config();

const uri = process.env.MONGODB_URI;
// console.log(uri)

// const DB=mongoose.connect(uri, { useNewUrlParser: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch(err => console.error('Error connecting to MongoDB:', err));
const DB = async () => {
  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};

module.exports = DB;
