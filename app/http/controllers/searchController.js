const path = require("path");
const Note = require("../../models/note");
const User = require("../../models/user");
const passport = require("passport");

// Factory method:
function searchController() {
  return {
    index: function (req, res) {
      // for extracting the logged in username:
      objId = req.session.passport.user;
      // console.log(typeof objId);
      User.findOne({ _id: objId })
        .then((data) => {
          // console.log(data.name);
          return data.name;
        })
        .then((data) => {
          res.render("users/searchNotes.ejs", { name: data });
        });
    },

    postSearch: function (req, res) {
      let searchValue = req.body.searchValue.trim();

      // for extracting the logged in username:
      userId = req.session.passport.user;

      Note.find({ user: userId, title: searchValue }).then((allNotes) => {
        console.log(allNotes);
      });

      return res.send(searchValue);
    },
  };
}

module.exports = searchController;
