"use strict";

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB  NOT     Connected", err));

// Burayı module.export etmedik çünkü buradaki kodları bir kere çalıştırıcaz tekrar tekrar kullanmayacağız