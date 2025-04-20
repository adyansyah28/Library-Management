//import database
const connection = require("../config/db");
const modelBook = require("../model/bookM");

async function getBook(req, res) {
  try {
    let result = await modelBook.getBook();
    return res.status(200).json({
      status: true,
      message: "Book List",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function getBookById(req, res) {
  const id = req.params.id;
  try {
    let result = await modelBook.getBookById(id);
    return res.status(200).json({
      status: true,
      message: "Book List",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function searchBook(req, res) {
  //query
  const search = "%" + req.params.search + "%";
  try {
    let result = await modelBook.getBookBySearch(search);
    return res.status(200).json({
      status: true,
      message: "Book List",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function searchBookPagination(req, res) {
  const search = "%" + req.params.search + "%";
  const page = req.params.page;
  const limit = 10;
  const offset = limit * page - limit;
  //check book list

  try {
    let result = await modelBook.checkSearchBookList(search);
    if (result[0].count > 0) {
      const totalPage = Math.ceil(result[0].count / limit);
      result = await modelBook.getBookBySearchPaged(search, limit, offset);

      return res.status(200).json({
        status: true,
        message: "Book List",
        totalPage: totalPage,
        data: result,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "No Book List",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function getBookPagination(req, res) {
  //query
  const page = req.params.page;
  const limit = 10;
  const offset = limit * page - limit;
  try {
    let result = await modelBook.checkBooklist();
    if (result[0].count > 1) {
      const totalPage = Math.ceil(result[0].count / limit);
      result = await modelBook.getBookPaged(limit, offset);
      return res.status(200).json({
        status: true,
        message: "Book List",
        totalPage: totalPage,
        data: result,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "No Book List",
      });
    }
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function addBook(req, res) {
  //define formData
  const { title, writer, quantity } = req.body;
  const username = req.user.username;

  try {
    await modelBook.saveBook(title, writer, quantity, username);
    return res.status(201).json({
      status: true,
      message: "Insert Data Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function updateBook(req, res) {
  const id = req.body.id;
  //checking post
  let temp = Object.keys(req.body);
  let buff = [];

  if (temp.includes("title")) {
    buff.push(`title='${req.body.title}'`);
  }
  if (temp.includes("writer")) {
    buff.push(`writer='${req.body.writer}'`);
  }
  if (temp.includes("quantity")) {
    buff.push(`quantity=${req.body.quantity}`);
  }
  if (temp.includes("is_deleted")) {
    buff.push(`is_deleted=${req.body.is_deleted}`);
  }
  const sets = buff.join(",");

  try {
    await modelBook.updateBook(id, sets);
    return res.status(200).json({
      status: true,
      message: "Update Data Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function deleteBook(req, res) {
  const id = req.body.id;
  try {
    await modelBook.deleteBook(id);
    return res.status(200).json({
      status: true,
      message: "Deleted Permanently",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function loanBook(req, res) {
  const book_id = req.body.id;
  const user_id = req.user.id;

  try {
    let result = await modelBook.getBookById(book_id);
    if (result != null) {
      const newQuantity = result[0].quantity - 1;

      await modelBook.insertLoanBook(user_id, book_id);
      await modelBook.setQuantityBook(newQuantity, book_id);

      return res.status(200).json({
        status: true,
        message: "Loan Book Success",
      });
    } else {
      return res.status(204).json({
        status: true,
        message: "Book Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function returnBook(req, res) {
  const book_id = req.body.id;
  const user_id = req.user.id;
  // Getting Book Information
  try {
    let result = await modelBook.checkLoanBookById(user_id, book_id);
    if (result[0].count > 0) {
      await modelBook.updateLoanBook(user_id, book_id);
      result = await modelBook.getQuantityBook(book_id);
      const newQuantity = result[0].quantity + 1;
      await modelBook.setQuantityBook(newQuantity, book_id);

      return res.status(200).json({
        status: true,
        message: "Loan Book Returned",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Loan Book Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function getLoanlistPaged(req, res) {
  //query
  const page = req.params.page;

  const limit = 10;
  const offset = limit * page - limit;
  try {
    let result = await modelBook.checkLoanBook();
    if (result[0].count > 0) {
      const totalPage = Math.ceil(result[0].count / limit);
      result = await modelBook.getLoanlistPaged(limit, offset);
      return res.status(200).json({
        status: true,
        message: "Loan Book List",
        totalPage: totalPage,
        data: result,
      });
    } else {
      return res.status(204).json({
        status: true,
        message: "No Loan Book List",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getBook,
  getBookById,
  searchBook,
  searchBookPagination,
  getBookPagination,
  addBook,
  updateBook,
  deleteBook,
  loanBook,
  returnBook,
  getLoanlistPaged,
};
