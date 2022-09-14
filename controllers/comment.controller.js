const Comment = require("../models/Comment");
const Post = require("../models/Post");

// add comment to a post using post Id
async function addComment(commentData) {
  try {
    if (!commentData) {
      return { message: "Please provide correct information", status: "Error" };
    }
    if (!commentData.postId) {
      return { message: "Post Id is required", status: "Error" };
    }
    if (!commentData.name) {
      return { message: "Name is required", status: "Error" };
    }
    if (!commentData.email) {
      return { message: "email is required", status: "Error" };
    }
    if (!commentData.body) {
      return { message: "Please write some description.", status: "Error" };
    }
    let post;
    try {
      post = await Post.findById(commentData.postId);
    } catch (error) {
      return { message: "Post not found.", status: "Error", statusCode: 404 };
    }
    await Comment.create(commentData);
    return {
      message: "you have been commented on this post.",
      status: "Success",
      post,
    };
  } catch (error) {
    return { message: "Internal server Error", error, status: "Error" };
  }
}

module.exports = addComment;
