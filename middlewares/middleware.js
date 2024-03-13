// index.js içine aşağıdakini yapıştır:
// "use strict";

// require("dotenv").config();

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;

// const express = require("express");

// const app = express(); // express üzerinde bir server oluşturduk
// app.use(express.json()); // post isteğinde json post ediliyorsa req.body'i görebilmek için gerekli

// const { middleFunc1, middleFunc2 } = require("./middlewares/"); // in object
// app.use(middleFunc1, middleFunc2);

// app.get("/*", (req, res) => {
//   res.send({
//     message1: req.message1,
//     message2: req.message2,
//     message: "Finished",
//   });
// });

// app.listen(PORT, HOST, () =>
//   console.log(`Server runned http://${HOST}:${PORT}`)
// );

module.exports = {
  middleFunc1: (req, res, next) => {
    console.log("middleFunc1 started.");
    req.message1 = "middleFunc1 started.";
    next();
  },

  middleFunc2: (req, res, next) => {
    console.log("middleFunc2 started.");
    req.message2 = "middleFunc2 started.";
    next();
  },
};
