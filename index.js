/*
    $ npm i express dotenv express-async-errors
    $ npm i mongoose
*/

"use strict";

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");
const app = express();
app.use(express.json());

require("./src/configs/dbConnection.js");

app.use("/user", require("./src/routes/user.router"));
app.use("/blog", require("./src/routes/blog.router.js"));

app.use(require("./src/middlewares/errorHandler.js")); // aşağıda kalsın

app.listen(PORT, HOST, () =>
  console.log(`Server runned http://${HOST}:${PORT}`)
);

// require('./src/sync')()
