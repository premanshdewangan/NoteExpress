const path = require("path");

// Factory method:
function createController() {
  return {
    index: function (req, res) {
      res.render("users/createNote");
    },
  };
}

module.exports = createController;
