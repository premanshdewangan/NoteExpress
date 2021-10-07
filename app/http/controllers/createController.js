const path = require("path");
const Note = require("../../models/note");
const User = require("../../models/user");

// Factory method:
function createController() {
  return {
    index: function (req, res) {
      objId = req.session.passport.user;
      User.findOne({ _id: objId })
        .then((data) => {
          console.log(data.name);
          return data.name;
        })
        .then((name) => {
          res.render("users/createNote", { name });
        });
    },

    postIndex: function (req, res) {
      const { title, desc } = req.body;
      console.log(req.body);
      if (req.body.title === "" || req.body.desc === "") {
        /*
          req.flash('msg', "FAILED !! Please fill both the fields");
          req.flash('color', 'danger');
          return res.redirect('/createNote');
          */
        let x = {
          msg: "FAILED !! Please fill both the fields",
          color: "danger",
        };
        console.log(req.body);
        res.send(x);
      } else {
        /*
        req.flash('msg', "Note created!!");
        req.flash('color', 'success');
        console.log("Note created..");
        res.render("users/createNote");
        */

        const note = new Note({
          title: title,
          description: desc,
          user: req.session.passport.user,
        });

        note
          .save()
          .then((note) => {
            let x = {
              msg: "Note created!!",
              color: "success",
            };
            // console.log("inside main")
            // console.log(note);
            //create note:
            return res.send(x);
          })
          .catch((err) => {
            let x = {
              msg: "Something went wrong! Please Try again!!",
              color: "danger",
            };
            // console.log("inside catch")
            return res.send(x);
          });

        // console.log(req.body);
      }
    },
  };
}

module.exports = createController;
