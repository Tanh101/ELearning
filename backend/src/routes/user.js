const userController = require("../app/controller/userController")

const router = require('express').Router();

//GET ALL USER
router.get("/", userController.getAllUser)

module.exports = router