"use strict";

const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "blogPost",
    timestamps: true,
  }
);

const BlogPostModel = mongoose.model("BlogPost", blogPostSchema);
module.exports = {
  BlogPost: BlogPostModel,
};
