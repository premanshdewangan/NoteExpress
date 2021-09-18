const path = require("path");

// Factory method:
function searchController() {
  return {
    index: function (req, res) {
      res.render("users/searchNotes.ejs");
    },
  };
}

module.exports = searchController;
