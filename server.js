const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");

const app = express();

// Static middleware:
app.use(express.static("public"));

// Ejs setup:
app.set("view engine", "ejs");
console.log(app.get("views"));

// using initRoutes:
require("./routes/web")(app);

// listening server:
app.listen(port, () => {
  console.log("Listening on PORT 3000");
});
