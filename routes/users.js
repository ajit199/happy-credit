const userRoute = require("express").Router();
const createUser = require("../controllers/user.controller");
userRoute.post("/create", async (req, res) => {
  let { message, status, user } = await createUser(req.body);
  if (status === "Error") return res.status(500).send({ message });
  res.status(201).json({ message, user });
});

module.exports = userRoute;
