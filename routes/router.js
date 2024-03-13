// index.js içine aşağıdakini yapıştır:
// "use strict";

// require("dotenv").config();

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;

// const express = require("express");

// const app = express();
// app.use(express.json());

// app.use(require("./routes/router.js")); //sablon1'e eklenen farklı satır

// app.listen(PORT, HOST, () =>
//   console.log(`Server runned http://${HOST}:${PORT}`)
// );

"use strict";

const router = require("express").Router();

// const { middleFunc1, middleFunc2 } = require("../middlewares/");
// router.use(middleFunc1, middleFunc2);
// Middlewareları index.js içinde app.use içinde kullanableceğin gibi router.use içinde de kullanabilirsin

router
  .route("/")
  .get((req, res) => res.send({ message: "get" }))
  .post((req, res) => res.send({ message: "post" }))
  .put((req, res) => res.send({ message: "put" }))
  .delete((req, res) => res.send({ message: "delete" }));

module.exports = router;
