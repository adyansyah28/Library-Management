const { Client } = require("pg");

const connection = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "root",
  database: "library",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connection Successfully!");
  }
});

module.exports = connection;
