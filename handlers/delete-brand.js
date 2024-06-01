module.exports = async (req, res, next, models) => {
  const { id } = req.query;

  await models.brands.destroy({
    where: {
      id: id,
    },
  });

  res.json("Brand was succsesfully deleted!");
};
