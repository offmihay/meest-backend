const models = require("./../models/init-models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next, models) => {
  const { username, password } = req.body;

  const user = await models.users.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password_hash !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  res.json({ userData: { username: user.username, token: `${token}` } });
};
