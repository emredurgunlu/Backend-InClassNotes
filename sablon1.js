"use strict";

require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");

const app = express(); // express üzerinde bir server oluşturduk
app.use(express.json()); // post isteğinde json post ediliyorsa req.body'i görebilmek için gerekli

/* -------------------------------------------------------------------------- */
/*                                   KODLAR                                   */
/* -------------------------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send("WELCOME BLOG API PROJECT");
});

/* -------------------------------------------------------------------------- */
/*                                   KODLAR                                   */
/* -------------------------------------------------------------------------- */

app.listen(PORT, HOST, () =>
  console.log(`Server runned http://${HOST}:${PORT}`)
);
