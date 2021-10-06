const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const showNotesController = require("../app/http/controllers/showNotesController");
const searchController = require("../app/http/controllers/searchController");
const createController = require("../app/http/controllers/createController");
const guest = require('../app/http/middlewares/guest');


function initRoutes(app) {
  app.get("/", guest, homeController().index);
  app.get("/index.html", guest, homeController().index);
  app.get("/dashboard", homeController().dashboard);

  app.get("/login", guest, authController().login);
  app.get("/register", guest, authController().register);
  app.post("/postRegister", authController().postRegister);
  app.post("/login", authController().postLogin);
  app.post('/logout', authController().logout);

  app.get("/showNotes", showNotesController().index);
  app.get("/searchNotes", searchController().index);
  app.get("/createNote", createController().index);
  app.post("/createNote", createController().postIndex);
}

module.exports = initRoutes;
