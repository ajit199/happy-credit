const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const app = express();

// using cors package to resolve CORS issue.
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// created respective routes to handle requests which belong to a specific endpoint.
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

// making the connection with mongo DB.
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo DB is connected.");
});

app.get("/", (req, res) => {
  res.send("App is working.");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
