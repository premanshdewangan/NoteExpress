const User = require("../../models/user");
const passport = require("passport");


function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  // for extracting the logged in username:
  objId = req.session.passport.user;
  User.findOne({ _id: objId })
    .then((data) => {
      console.log(data.name);
      return data.name;
    })
    .then((name) => {
        res.render("users/dashboard", { name: name});
    });
}

module.exports = guest;
