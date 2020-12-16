const mongoose = require("mongoose");
const config = require("config");
const db = "mongodb://localhost:27017";
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("db connected!!");
  } catch (err) {
    console.log(err.message);

    process.exit(1);
  }
};

module.exports = {
  connectDB: connectDB,
  User: require("./User"),
  Kickoff: require("./Kickoff"),
  Interest: require("./Interest"),
  Group: require("./Group"),
};
