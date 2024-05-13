const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next, models) => {
  const { username, password } = req.body;

  const user = await models.users.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const theSame = await bcrypt.compare(password, user.password_hash);

  if (!theSame) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  await models.users.update(
    { last_login_date: new Date() },
    { where: { id: user.id } }
  );

  res.json({ userData: { userID: user.id, token: `${token}` } });

};
