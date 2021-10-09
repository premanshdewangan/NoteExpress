const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const showNotesController = require("../app/http/controllers/showNotesController");
const searchController = require("../app/http/controllers/searchController");
const createController = require("../app/http/controllers/createController");
const guest = require('../app/http/middlewares/guest');
const userCheck = require('../app/http/middlewares/userCheck');


function initRoutes(app) {
  app.get("/", guest, homeController().index);
  app.get("/index.html", guest, homeController().index);
  app.get("/dashboard", userCheck, homeController().dashboard);

  app.get("/login", guest, authController().login);
  app.get("/register", guest, authController().register);
  app.post("/postRegister", authController().postRegister);
  app.post("/login", authController().postLogin);
  app.post('/logout', authController().logout);

  app.get("/showNotes", userCheck, showNotesController().index);
  app.get("/searchNotes", userCheck, searchController().index);
  app.post("/searchNote", searchController().postSearch);
  app.get("/createNote", userCheck, createController().index);
  app.post("/createNote", createController().postIndex);
}

module.exports = initRoutes;
