const commentRoute = require("express").Router();
const addComment = require("../controllers/comment.controller");

// add  comment to a post.
commentRoute.post("/addcomment", async (req, res) => {
  let { message, status, post, statusCode } = await addComment(req.body);
  if (status === "Error")
    return res.status(statusCode || 500).send({ message });
  res.status(201).json({ message, post });
});

module.exports = commentRoute;
