const path = require("path");
const User = require("../../models/user");
const passport = require("passport");


// Factory method:
function homeController() {
  return {
    index: function (req, res) {
      res.sendFile(
        path.join(__dirname, "../../../") + "public/html/index.html"
      );
    },

    dashboard: function (req, res) {
      // for extracting the logged in username:
      objId = req.session.passport.user;
      User.findOne({ _id: objId })
        .then((data) => {
          console.log(data.name);
          return data.name;
        })
        .then((name) => {
          res.render("users/dashboard", { name: name });
        });
    },
  };
}

module.exports = homeController;
