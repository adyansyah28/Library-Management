const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");
const controllerBook = require("../controller/bookC");

router.get("/", userAuth.verifyToken, controllerBook.getBook);

router.get("/:id", userAuth.verifyToken, controllerBook.getBookById);

router.get("/search/:search", userAuth.verifyToken, controllerBook.searchBook);

router.get(
  "/search/:search/page/:page",
  userAuth.verifyToken,
  controllerBook.searchBookPagination
);

router.get(
  "/page/:page",
  userAuth.verifyToken,
  controllerBook.getBookPagination
);

router.post(
  "/addBook",
  userAuth.verifyToken,
  userAuth.isAdmin,
  controllerBook.addBook
);

router.put(
  "/updateBook",
  userAuth.verifyToken,
  userAuth.isAdmin,
  controllerBook.updateBook
);

// Delete Permanent
router.delete(
  "/delete",
  userAuth.verifyToken,
  userAuth.isAdmin,
  controllerBook.deleteBook
);

// Loan Book
router.put("/loanBook", userAuth.verifyToken, controllerBook.loanBook);

// returning loan book
router.put("/returnBook", userAuth.verifyToken, controllerBook.returnBook);

// get list loan book
router.get(
  "/getLoanList/page/:page",
  userAuth.verifyToken,
  controllerBook.getLoanlistPaged
);

module.exports = router;
