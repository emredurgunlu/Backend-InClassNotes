"use strict";

require("express-async-errors");

const { BlogCategory, BlogPost } = require("../models/blog.model");

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    const newdata = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogPost = {
  list: async (req, res) => {
    /* FILTERING & SEARCHING & SORTING & PAGINATION */
    // FILTERING:
    // URL?filter[key1]=value1&filter[key2]=value2
    // http://127.0.0.1:8000/blog/posts?filter[blogCategoryId]=65f6f49749f2b113b4366f0f
    const filter = req.query?.filter || {};
    // console.log(filter);

    // SEARCHING:
    // URL?search[key1]=value1&search[key2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // http://127.0.0.1:8000/blog/posts?search[title]=test 1&search[content]=test 10&filter[published]=1
    const search = req.query?.search || {};
    // console.log(search);
    //? { title: 'test 0', content: 'test' } -> { title: { $regex: 'test 0' }, content: { $regex: 'test' } }

    for (let key in search) {
      // search['title'] = { $regex: search['title'] }
      // search['content'] = { $regex: search['content'] }
      // search[key] = { $regex: search[key] };
      search[key] = { $regex: search[key], $options: "i" }; // i: insensitive
    }

    // console.log(search);

    // SORTING:
    // URL?sort[key1]=asc&sort[key2]=desc
    // asc: A-Z - desc: Z-A
    // http://127.0.0.1:8000/blog/posts?sort[title]=desc
    const sort = req.query?.sort || {};
    // console.log(sort);

    // PAGINATION:
    // URL?page=3&limit=10

    // Limit:
    // http://127.0.0.1:8000/blog/posts?limit=2
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20); // limit=abc yazarsan da 20 olur, limiti hiç göndermesen url'den yine 20 olur
    console.log("limit", limit);

    // Page:
    // http://127.0.0.1:8000/blog/posts?page=5&limit=4
    let page = Number(req.query?.page);
    // page = page > 0 ? page : 1
    page = page > 0 ? page - 1 : 0; // Backend 'de sayfa sayısı her zmaan page-1 olarak hesaplanmalı.
    console.log("page", page);

    // Skip:
    // LIMIT 20, 10
    let skip = Number(req.query?.skip);
    skip = skip > 0 ? skip : page * limit;
    console.log("skip", skip);

    /* FILTERING & SEARCHING & SORTING & PAGINATION */
    // const data = await BlogPost.find({ published: true }) find metodu bir obje yazarsan yazdığın objeye göre filtreleme yapar. const filter zaten bir obje tutuyordu.
    // http://127.0.0.1:8000/blog/posts?filter[title]=test 1 title
    // const data = await BlogPost.find(filter);
    // const data = await BlogPost.find({ ...filter, ...search });
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort);
    const data = await BlogPost.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body, // kaydetmek için gönderdiğim veri
      data: data, // kaydettikten sonra dönen sonuç info about update
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);
    const newdata = await BlogPost.find({ _id: req.params.postId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      // güncel veriyi istiyorsan tekrar çağır (newdata)
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
