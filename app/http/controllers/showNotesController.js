const path = require("path");
const Note = require('../../models/note');

// Factory method:
function showNotesController() {
  return {
    index: function (req, res) {
      Note.find().then((allNotes) => {
        console.log(allNotes);
        res.render("users/showNotes");
      })
      
    },
  };
}

module.exports = showNotesController;
