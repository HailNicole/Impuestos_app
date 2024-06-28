const User = require("../models/user");
const usersController = {};

usersController.getUsers = async (req, res) => {
  res.send("Bienvenido al backend de Gestion Usuarios 2.0");
};

module.exports = usersController;