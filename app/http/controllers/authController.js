const path = require("path");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { render } = require("ejs");
const passport = require("passport");
const { session } = require("passport");

// Factory method:
function authController() {
  return {
    login: function (req, res) {
      res.render("auths/login");
    },

    postLogin: function (req, res, next) {
      const { email, password } = req.body;
      // Validate request
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          // for extracting the logged in username:
          objId = req.session.passport.user;
          console.log(typeof(objId));
          User.findOne({ _id: objId })
            .then((data) => {
              console.log(data.name);
              return data.name;
            })
            .then((name) => {
              res.render("users/dashboard", { name });
            });

        });
      })(req, res, next);
    },

    register: function (req, res) {
      res.render("auths/register");
    },

    postRegister: async function (req, res) {
      // object destructuring:
      const { name, email, password, confirmPassword } = req.body;

      // validate request:
      if (!name || !email || !password || !confirmPassword) {
        console.log(req.body);
        req.flash("error", "All fields are required !!");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // check if email exists:
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      // checking again with confirm password:
      if (password != confirmPassword) {
        req.flash(
          "error",
          "Password is not getting matched with confirm password."
        );
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // hash password:
      const hashedPassword = await bcrypt.hash(password, 10);

      //Create a user:
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          //login:
          res.render("users/dashboard", { name });
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/register");
        });
    },

    logout : function(req, res)
    {
      req.logout();
      return res.redirect('/');
    }
  };
}

module.exports = authController;
