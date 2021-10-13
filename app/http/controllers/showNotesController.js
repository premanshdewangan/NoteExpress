const path = require("path");
const Note = require("../../models/note");
const passport = require("passport");
const User = require("../../models/user");
const { title } = require("process");

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
            // console.log(allNotes);
            res.render("users/showNotes", {
              allNotes: allNotes,
              name: name,
              count: 0,
            });
          });
        });
    },

    deleteNote: function (req, res) {
      // console.log(req.body.id);
      noteId = req.body.id;
      Note.deleteOne({ _id: noteId }, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
        return res.redirect("/showNotes");
      });
    },

    editNote: function (req, res) {
      const { newTitleValue, newDescValue, objId } = req.body;
      console.log(newTitleValue);
      console.log(newDescValue);
      console.log(objId);

      Note.findOneAndUpdate(
        { _id: objId },
        { title: newTitleValue, description: newDescValue },
        // If `new` isn't true, `findOneAndUpdate()` will return the
        // document as it was _before_ it was updated.
        { new: true }
      )
        .then((data) => {
          if (data._id) {
            let x = {
              msg: "Edited Succesfully",
              color: "success",
            };
            return res.send(x);
          }
        })
        .catch((err) => {
          let x = {
            msg: "Something went wrong",
            color: "danger",
          };
          console.log(err);
          return res.send(x);
        });
    },
  };
}

module.exports = showNotesController;
