const path = require("path");

// Factory method:
function homeController() {
  return {
    index: function (req, res) {
      res.sendFile(
        path.join(__dirname, "../../../") + "public/html/index.html"
      );
    },

    dashboard: function (req, res) {
      res.render("users/dashboard");
    },
  };
}

module.exports = homeController;
