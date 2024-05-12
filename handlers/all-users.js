module.exports = async (req, res, next, models) => {
  const brands = await models.users.findAll();
  const transformedUsers = brands.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    birth_date: user.birth_date,
    creation_date: user.creation_date,
    last_login_date: user.last_login_date,
    permission: user.permission,
  }));
  res.json(transformedUsers);
};
