module.exports = async (req, res, next, models) => {
  console.log(models);
  const { gender } = req.query;
  if (!gender) {
    return res.status(400).json({ error: "Gender parameter is missing" });
  }

  const genderInfo = await models.genders.findOne({
    where: { key: gender },
  });

  if (!genderInfo) {
    return res.status(400).json({ error: "Invalid gender key" });
  }

  const brandsData = await models.clothes_data.findAll({
    where: { gender_id: genderInfo.id },
    attributes: ["brand_id"],
    group: ["brand_id"],
  });

  const brandIds = brandsData.map((item) => item.brand_id);

  const brandsInfo = await models.brands.findAll({
    where: { id: brandIds },
    attributes: ["id", "key", "name"],
  });

  res.json(brandsInfo);
};
