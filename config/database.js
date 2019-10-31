const mongoose = require("mongoose");
const configureDB = () => {
  // db configuration - establishing connection to db
  mongoose.Promise = global.Promise;
  // mongodb+srv://sufiyan1:<password>@cluster0-ooi6z.mongodb.net/test?retryWrites=true&w=majority
  const CONNECTION_URI =
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/june-weekday-notesapp";
  mongoose
    .connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("successfully connected to db");
    })
    .catch(err => {
      console.log("error connecting to db", err);
    });
};

module.exports = configureDB;
