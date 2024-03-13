"use strict";

const express = require("express");

const app = express(); // express üzerinde bir server oluşturduk
app.use(express.json()); // post isteğinde json post ediliyorsa req.body'i görebilmek için gerekli

/* -------------------------------------------------------------------------- */
/*                                   KODLAR                                   */
/* -------------------------------------------------------------------------- */

app.listen(3000);
