require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require('passport');

// database connection:
const url = "mongodb://localhost/NotesApp";
mongoose.connect(url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // UseFindAndModify: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("err", () => {
    console.log("Connection failed...");
  });

// Session store( not using new any more but a method .create.)
// let mongoStore = new MongoDbStore({
//   mongooseConnection: connection,
//   collection: "sessions",
// });

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: url,
      collection: "sessions"
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

// passport config:
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())


// Static middleware:
app.use(express.static("public"));

// express middlewares:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(flash());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})

// template engine setup:
app.set("view engine", "ejs");
console.log(app.get("views"));

// using initRoutes:
require("./routes/web")(app);

// listening server:
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
