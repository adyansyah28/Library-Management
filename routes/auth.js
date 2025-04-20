require("dotenv").config();
const express = require("express");
const router = express.Router();
const controllerAuth = require("../controller/authC");

//register
router.post("/register", controllerAuth.register);

// login
router.post("/login", controllerAuth.login);

//Refresh Token
router.post("/refreshToken", controllerAuth.refreshToken);

//logout
router.delete("/logout", controllerAuth.logout);

module.exports = router;
