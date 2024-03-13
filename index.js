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
/* -------------------------------------------------------------------------- */
/*                                   KODLAR                                   */
/* -------------------------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send("WELCOME BLOG API PROJECT");
});

app.use("/blog", require("./src/routes/blog.router.js"));
/* -------------------------------------------------------------------------- */
/*                                   KODLAR                                   */
/* -------------------------------------------------------------------------- */

app.use(require("./src/middlewares/errorHandler.js")); // aşağıda kalsın

app.listen(PORT, HOST, () =>
  console.log(`Server runned http://${HOST}:${PORT}`)
);
