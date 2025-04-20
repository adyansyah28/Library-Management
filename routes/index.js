const express = require("express");
const router = express.Router();

//import route auth
const authRouter = require("./auth");
router.use("/api/auth", authRouter); // use route auth di Express
//import route book
const bookRouter = require("./book");
router.use("/api/book", bookRouter); // use route book di Express

module.exports = {
  router,
};
