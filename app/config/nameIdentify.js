const User = require("../models/user");
const passport = require("passport");

function getUsername(req) {
  let username;
  // for extracting the logged in username:
  objId = req.session.passport.user;
  User.findOne({ _id: objId })
    .then((data) => {
      return data.name;
    })
    .then((name) => {
        console.log(name);
        username = name;
    })
    .catch((err) => {
      console.log("error occured");
    });
  return username;
}

module.exports = getUsername;
