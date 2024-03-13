"use strict";

require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");

const app = express(); // express üzerinde bir server oluşturduk
app.use(express.json()); // post isteğinde json post ediliyorsa req.body'i görebilmek için gerekli


// app.get("/*", bütün urlelerde çalışır
app.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});

// "/", bu kısma istediğini yazabilirsin "/elma" veya "/elma/armut" dersen thunder clientta da aynısı olması gerekir
// res.status(200).send şeklinde http status kodu belirtebilirsin

app.post("/", (req, res) => {
  res.send({ message: "POST method called" });
});

app.post("/emre", (req, res) => {
  res.send(req.body);
});

app.put("/", (req, res) => {
  res.send({ message: "PUT method called" });
});
app.delete("/", (req, res) => {
  res.send({ message: "DELETE method called" });
});

// app.all("/", (req, res) => {
//   res.send({ message: "Hangi metotla istek atılırsa atılsın çalışır. app.use da app.all gibi" });
// }); sıra önemlidir, yukardakilerden biri çalışırsa .all çalışmaz, Bunu diğerlerinin üstüne koyarsan bu çalışır diğerleri çalışmaz

// app.get("/:blogID", (req, res) => {
//   res.send({
//     params: req.params,
//   });
// });

app.get("/:blogID/location/:localID", (req, res) => {
  res.send({
    params: req.params,
    veya: req.params.blogID,
    url: {
      protocol: req.protocol,
      domain: req.hostname,
      method: req.method,
      url: req.url,
      path: req.path,
      params: req.params,
      body: req.body,
      query: req.query,
      header: req.headers,
    },
  });
});

// '/:userId[0-9]', sadece rakam olsun demek

app.get("/:blogID-:userID", (req, res) => {
  res.send({
    ilki: req.params.blogID,
    ikincisi: req.params.userID,
  });
});

// query için buradaki url'de ekstra yapman gereken bişey yok ama thunder clinttan yada browser urlsinden http://127.0.0.1:8000/sorgula?ters=true yapman gerek
// Ama parametre için buradaki url'ye :idx gibi ekliyorsun
app.get("/sorgula", (req, res) => {
  res.send({ query: req.query });
});

//? redirect (sadece 300 lü kodlar)
app.get("/google", (req, res) => {
  // res.redirect(301,'https://www.google.com')
  // res.redirect(302,'/about')
});
// Yukardakini thunder clienttan değil de browserdan dene

//? show file content
app.get("/file", (req, res) => {
  // __dirname bulunduğun klasör
  res.sendFile(__dirname + "/index.js");
  // res.redirect(302,'/about')
});




app.listen(PORT, HOST, () =>
  console.log(`Server runned http://${HOST}:${PORT}`)
);
