"use strict";

require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");

const app = express(); // express üzerinde bir server oluşturduk

// Bu 4 satır da bir middleware. Bazı middlewareları ise app.use yapmadan önce require etmek gerekiyor
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // form işlemleri için, pek kullanılmıyor
app.use(express.static("public")); // browsera /beni_oku.txt yaz

function m1(req, res, next) {
  console.log("m1 deyim");
  next();
  console.log(
    "İsin asli: Bir sonraki olayin kesilip buradaki next(); satirina yapistirilmasi gibidir"
  );
}

// yukarda başka bir fonksyon daha oluşturup app.use(m1,m2); diye de çağırabilirdik
// app.use("/emre",m1); böyle olsaydı m1 sadece /emre urlsi için aktif oludu, diğerleri için çalışmazdı
app.use(m1);

// req ve res tüm middlewarelarda ortak bu nedenler req veya res'de ekleme yaparak diğer middleware'e veri gönderebilirsin

// app.use( yerine app.get("/",(req, res, next) => de yapabilirsin
app.use((req, res, next) => {
  console.log("m2 deyim");
  next();
});

app.use((req, res) => {
  console.log("m3 deyim");
  res.send("m3 tamamlandi");
});

app.listen(PORT, HOST, () =>
  console.log(`Server runned http://${HOST}:${PORT}`)
);
