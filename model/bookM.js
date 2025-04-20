//import database
const connection = require("../config/db");

async function getBook() {
  let response;
  try {
    const getQuery =
      "SELECT id,title,writer,quantity,created_by,created_at,updated_at FROM book WHERE is_deleted=false ORDER BY title";
    response = await connection.query(getQuery);
    console.log(response.rows);
    return response.rows;
  } catch (error) {}
}

async function getBookById(id) {
  let response;
  try {
    const getQuery =
      "SELECT id, title, writer, quantity, created_by, created_at,updated_at FROM book WHERE id=$1 AND is_deleted=false ORDER BY title";
    response = await connection.query(getQuery, [id]);
    return response.rows;
  } catch (error) {}
}

async function getBookBySearch(search) {
  let response;
  try {
    const getQuery =
      "SELECT id, title, writer, quantity, created_by, created_at,updated_at FROM book WHERE id=$1 AND is_deleted=false ORDER BY title";
    response = await connection.query(getQuery, [search]);
    return response.rows;
  } catch (error) {}
}

async function getBookBySearchPaged(search, limit, offset) {
  let response;
  try {
    const getQuery =
      "SELECT id,title,writer,quantity,created_by,created_at,updated_at FROM book WHERE (title LIKE $1 or writer LIKE $1) and is_deleted=false ORDER BY title LIMIT $2 OFFSET $3";
    response = await connection.query(getQuery, [search, limit, offset]);
    return response.rows;
  } catch (error) {}
}

async function checkSearchBookList(search) {
  let response;
  try {
    const countQuery =
      "SELECT COUNT(id) FROM book WHERE (title LIKE $1 or writer LIKE $1) AND is_deleted=false";
    response = await connection.query(countQuery, [search]);
    return response.rows;
  } catch (error) {}
}

async function checkBooklist() {
  let response;
  try {
    const countQuery = "SELECT COUNT(id) FROM book WHERE is_deleted=false";
    response = await connection.query(countQuery);
    return response.rows;
  } catch (error) {}
}

async function getBookPaged(limit, offset) {
  let response;
  try {
    const getQuery =
      "SELECT id,title,writer,quantity,created_by,created_at,updated_at FROM book WHERE is_deleted=false ORDER BY title LIMIT $1 OFFSET $2";
    response = await connection.query(getQuery, [limit, offset]);
    return response;
  } catch (error) {}
}

async function saveBook(title, writer, quantity, username) {
  try {
    const insertQuery =
      "INSERT INTO book(title, writer, quantity, created_by, created_at, updated_at, is_deleted) VALUES ($1,$2,$3,$4,now(),now(),false)";
    await connection.query(insertQuery, [title, writer, quantity, username]);
  } catch (error) {}
}

async function updateBook(id, sets) {
  try {
    const updateQuery = `UPDATE book SET ${sets} , updated_at=now() WHERE id=$1`;
    await connection.query(updateQuery, [id]);
  } catch (error) {}
}

async function deleteBook(id) {
  try {
    const deleteQuery = "DELETE FROM book WHERE id=$1";
    await connection.query(deleteQuery, [id]);
  } catch (error) {}
}

async function insertLoanBook(user_id, book_id) {
  try {
    const insertQuery =
      "INSERT INTO loanBook (member_id,book_id,loan_at,return_at,is_return) VALUES ($1,$2,now(),now()+interval '7 days',false)";
    await connection.query(insertQuery, [user_id, book_id]);
  } catch (error) {}
}

async function checkLoanBookById(user_id, book_id) {
  let response;
  try {
    const getQuery =
      "SELECT COUNT(book_id) FROM loanBook WHERE book_id=$1 and member_id=$2";
    response = await connection.query(getQuery, [book_id, user_id]);
    console.log(response);
    return response.rows;
  } catch (error) {}
}

async function updateLoanBook(user_id, book_id) {
  try {
    const updateQuery =
      "UPDATE loanBook SET is_return=true WHERE member_id=$1 and book_id=$2";
    await connection.query(updateQuery, [user_id, book_id]);
  } catch (error) {}
}

async function getQuantityBook(book_id) {
  let response;
  try {
    const getQuery = "SELECT Quantity FROM book WHERE id=$1";
    response = await connection.query(getQuery, [book_id]);
    return response.rows;
  } catch (error) {}
}

async function setQuantityBook(quantity, book_id) {
  try {
    const updateQuery = "UPDATE Book SET quantity=$1 WHERE id=$2";
    await connection.query(updateQuery, [quantity, book_id]);
  } catch (error) {}
}

async function checkLoanBook() {
  let response;
  try {
    const getQuery = "SELECT COUNT(id) FROM loanBook";
    response = await connection.query(getQuery);
    return response.rows;
  } catch (error) {}
}

async function getLoanlistPaged(limit, offset) {
  let response;
  try {
    const getQuery =
      "SELECT loanBook.id, account.name, title, writer, loan_at, return_at, is_return FROM loanBook LEFT JOIN account ON loanBook.member_id = account.id LEFT JOIN book ON loanBook.book_id = book.id ORDER BY title limit $1 offset $2 ";
    response = await connection.query(getQuery, [limit, offset]);
    return response.rows;
  } catch (error) {}
}

module.exports = {
  getBook,
  getBookById,
  getBookBySearch,
  checkSearchBookList,
  getBookBySearchPaged,
  checkBooklist,
  getBookPaged,
  saveBook,
  updateBook,
  deleteBook,
  checkLoanBook,
  insertLoanBook,
  checkLoanBookById,
  updateLoanBook,
  setQuantityBook,
  getQuantityBook,
  getLoanlistPaged,
};
