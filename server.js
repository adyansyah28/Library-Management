const express = require("express"); // import express
const router = require("./routes");
const app = express();
const port = 3000;

//import body parser
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", router.router);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
