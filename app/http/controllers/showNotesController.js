const path = require("path");

// Factory method:
function showNotesController() {
  return {
    index: function (req, res) {
      res.render("users/showNotes");
    },
  };
}

module.exports = showNotesController;
