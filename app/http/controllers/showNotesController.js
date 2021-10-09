const path = require("path");
const Note = require("../../models/note");
const passport = require("passport");
const User = require("../../models/user");

// Factory method:
function showNotesController() {
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
        .then((name) => {
          userId = req.session.passport.user;

          Note.find({ user: userId }).then((allNotes) => {
            console.log(allNotes);
            res.render("users/showNotes", { allNotes: allNotes, name: name });
          });
        });
    },
  };
}

module.exports = showNotesController;
