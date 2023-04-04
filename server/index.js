"use strict";

const express = require("express");
const morgan = require("morgan");

const {blogPost, getBlogPosts, updateBlogPost, deleteBlogPost, getMostRecentPost, getBlogPostById} = require("./handlers/blogpost")
const {postComment, getComments, editComment, deleteComment} = require("./handlers/comments")

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/api/blogpost/", getBlogPosts)
  .get("/api/blogpost/recent", getMostRecentPost)
  .get("/api/blogpost/:id", getBlogPostById) 
  .get("/api/comment/:postId", getComments)

  .post("/api/blogpost/", blogPost)
  .post('/api/comment/:postId', postComment)

  .patch("/api/blogpost/:id", updateBlogPost)
  .patch("/api/comment/:commentId", editComment)

  .delete("/api/blogpost/:id", deleteBlogPost)
  .delete("/api/comment/:id", deleteComment)


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));