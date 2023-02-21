const userController = require("../app/controller/userController");
const auth = require('../middleware/auth');

const router = require('express').Router();

//GET ALL USER
router.get("/", auth.verifyToken, userController.getAllUser);

//DELETE USER BY ID (SOFT DELTETE)
router.delete("/:id",auth.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router