const express = require("express");
const configureDB = require("./config/database");
const router = require("./config/routes");
const cors = require("cors");
const app = express();
const port = 3005;
app.use(express.json());
app.use(cors());
configureDB();
app.use("/", router);
app.listen(port, () => {
  console.log("listening on port", port);
});
