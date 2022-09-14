const Post = require("../models/Post");

// get all posts with their comments using lookup keyword.
async function getPosts() {
  try {
    let posts = await Post.aggregate([
      { $set: { _id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
    ]);
    return { message: "posts fetched successfully", status: "Success", posts };
  } catch (error) {
    return { message: "Internal server Error", error, status: "Error" };
  }
}

module.exports = getPosts;
