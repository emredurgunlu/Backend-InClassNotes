"use strict";

const mongoose = require("mongoose");

// BLOG CATEGORY:
const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "blogCategory",
    timestamps: true,
  }
);

// 2 tabloyu birbirine bağlarken default ilişki tipi many to one'dır. Buradaki ilişki de many to one'dır.
// One to one ilişki 2 şekilde yapılabilir ya blogCategoryId: { 'ye unique: true, deriz ya da blogCategorySchema'ya nested bir obje ekleriz 12.satırdaki virgülden sonra relation: {name:{type:..},} gibi
// Many to many için blogCategoryId: [{...}] array içine alman gerekir

// BLOG POST:
const blogPostSchema = new mongoose.Schema(
  {
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalID
      ref: "BlogCategory",
      // buradaki referans ile BlogCategory'e bağlanıyor. ref olmasa populate çalışmaz
      // Buraya yazdığın model ismi; BlogCategory: mongoose.model("BlogCategory", blogCategorySchema), bu satırdaki model("BlogCategory" ile aynı olmalı
      required: true,
    },
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
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "blogPost",
    timestamps: true,
  }
);

module.exports = {
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
};
