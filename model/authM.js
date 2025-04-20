const connection = require("../config/db");

async function checkUsername(username) {
  let response;
  try {
    const checkQuery = "SELECT COUNT(id) FROM account WHERE Username=$1";
    response = await connection.query(checkQuery, [username]);
    return response.rows;
  } catch (error) {}
}

async function getAccount(username) {
  let response;
  try {
    const checkQuery =
      "SELECT id,username,password,role FROM account WHERE Username=$1";
    response = await connection.query(checkQuery, [username]);
    return response.rows;
  } catch (error) {}
}
async function addAccount(name, username, hashedPassword) {
  try {
    const insertQuery =
      "INSERT INTO account(name,username,password,role,created_at) VALUES ($1,$2,$3,'member',now())";
    await connection.query(insertQuery, [name, username, hashedPassword]);
  } catch (error) {}
}

async function saveRefreshToken(refreshToken) {
  try {
    const insertQuery = "INSERT INTO  refreshToken (token) VALUES ($1)";
    await connection.query(insertQuery, [refreshToken]);
  } catch (error) {}
}

async function checkRefreshToken(refreshToken) {
  let response;
  try {
    const getQuery = "SELECT COUNT(id) FROM refreshToken WHERE token=$1";
    response = await connection.query(getQuery, [refreshToken]);
    return response.rows;
  } catch (error) {}
}

async function deleteRefreshToken(refreshToken) {
  try {
    const deleteQuery = "DELETE FROM refreshToken WHERE token=$1";
    await connection.query(deleteQuery, [refreshToken]);
  } catch (error) {}
}

module.exports = {
  checkUsername,
  addAccount,
  getAccount,
  saveRefreshToken,
  checkRefreshToken,
  deleteRefreshToken,
};
