require("dotenv").config();
const setTZ = require('set-tz')
const express = require("express");
const app = express();
const engines = require("consolidate");
const { logRequest } = require("./middleware");
// set public assets directory

setTZ("India Standard Time")

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

// Init Middleware
app.use(logRequest);

app.use(express.json({ extended: false })); //bodyparser

app.use(express.urlencoded({ extended: true })); //bodyparser now body parser is in express

app.get("/", (req, res) => {
  res.send("reno server is running 1.3");
});

/* 
db = require('./db');
const { createUser,getUser } = require('./queries/user')
 */
app.use("/api/v1", require("./routes/purchase/premiumMemberShip"));

app.use("/api/v1", require("./routes/index"));

app.use("/api/v1/nearby", require("./routes/nearby"));

app.use("/api/v1/renoPay", require("./routes/purchase/renoPay"));

app.use("/api/v1", require("./routes/order"));

app.use("/api/v1", require("./routes/auth"));

app.use("/api/v1/restaurant", require("./routes/restaurant"));

app.use("/api/v1/restaurant/:restaurant_id/review", require("./routes/review"));

app.use("/api/v1", require("./routes/copyData")); // Disable in production

app.use(function (err, req, res, next) {
  //error handler
  console.log(err);
  if (err.kind === "ObjectId") {
    return res
      .status(404)
      .json({ errors: [{ msg: "Id Not found in the database!!" }] });
  }
  return res.status(500).json({ errors: [{ msg: "Server Error !!" }] });
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (process.env.__DEV__) {
    console.log("RUNNING IN DEV MODE");
  } else {
    console.log("RUNNING IN PRODUCTION");
  }
  console.log(`Server started on port ${PORT}`);
});
