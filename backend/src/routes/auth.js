const express = require('express');
const auth = require("../middleware/auth");
const authController = require('../app/controller/authController');
require('dotenv').config();

const router = express.Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/refresh", authController.requestRefreshToken)
router.post("/logout", auth.verifyToken, authController.logoutUser);


router.get('/', (req, res) => res.send('USER ROUTE'));
module.exports = router;