// index.js içine bu kodları yapıştır:
"use strict";

require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");

const app = express();
app.use(express.json());

app.get("/*", (req, res, next) => {
  res.errorStatusCode = 404;
  throw new Error("There is an Error Message", { cause: "No reason :)" });
});

// $ npm i express-async-errors

require("express-async-errors");

app.get("/async", async (req, res, next) => {
  throw new Error("Error in async-function");
});

//? It must be at last middleware.
app.use(require("./error/errorHandler.js"));

app.listen(PORT, HOST, () =>
  console.log(`Server runned http://${HOST}:${PORT}`)
);
