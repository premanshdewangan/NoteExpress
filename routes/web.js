const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const showNotesController = require("../app/http/controllers/showNotesController");
const searchController = require("../app/http/controllers/searchController");
const createController = require("../app/http/controllers/createController");


function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/index.html", homeController().index);
  app.get("/dashboard", homeController().dashboard);

  app.get("/login", authController().login);
  app.get("/register", authController().register);

  app.get("/showNotes", showNotesController().index);
  app.get("/searchNotes", searchController().index);
  app.get("/createNotes", createController().index);

}

module.exports = initRoutes;
