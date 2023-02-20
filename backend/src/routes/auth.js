const express = require('express');
const authController = require('../app/controller/authController');
require('dotenv').config();

const router = express.Router();
router.post("/register", authController.registerUser)
router.get('/', (req, res) => res.send('USER ROUTE'));
router.post("/login", authController.loginUser)
module.exports = router;