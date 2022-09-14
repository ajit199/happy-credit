const postRoute = require("express").Router();
const getPosts = require("../controllers/post.controller");

// get all posts with their comments
postRoute.get("/all", async (req, res) => {
  let { message, status, error, posts } = await getPosts();
  if (status === "Error") return res.status(500).send({ message, error });
  res.status(200).json({ message, posts });
});

module.exports = postRoute;
