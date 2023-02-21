const userController = require("../app/controller/userController")

const router = require('express').Router();

//GET ALL USER
router.get("/", userController.getAllUser);

//DELETE USER BY ID (SOFT DELTETE)
router.delete("/:id", userController.deleteUser);

module.exports = router