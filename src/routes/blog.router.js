"use strict";

const router = require("express").Router();

const { BlogPost } = require("../controllers/blog.controller.js");

router.route("/posts").get(BlogPost.list).post(BlogPost.create);

router
  .route("/posts/:postId")
  .get(BlogPost.read) // burada list yerine read dememizin sebebi tek bir kaydı getireceği için
  .put(BlogPost.update) // put patch aynı
  .patch(BlogPost.update)
  .delete(BlogPost.delete);

module.exports = router;
