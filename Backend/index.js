//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var cors = require("cors");
app.use(require("sanitize").middleware);
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var kafka = require("./kafka/client");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MONGODB Config

const dbkey = require("./config/keys").mongoURI;

// Connect to Mongo Db
mongoose
  .connect(dbkey)
  .then(() => console.log("MongoDB Connected!!"))
  .catch(err => console.log(err));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//index.js stores the homepage
var index = require("./routes/api/index");
var applicant = require("./routes/api/applicant");
var jobs = require("./routes/api/jobs");
var recruiter = require("./routes/api/recruiter");

//app.use('/', index);
app.use("/jobs", jobs);
app.use("/applicants", applicant);
app.use("/recruiters", recruiter);
app.use;

app.get("/healthcheck", (req, res) => {
  console.log("health check success");
  res.status(200);
  res.send();
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.listen(3001);
console.log("Server Listening on port 3001");
