module.exports = async (req, res, next, models) => {
  const { brand } = req.query;

  if (!brand) {
    return res.status(400).json({ error: "Brand parameter is missing" });
  }

  const brandInfo = await models.brands.findOne({
    where: { key: brand },
  });

  if (!brandInfo) {
    return res.status(400).json({ error: "Invalid brand key" });
  }

  const allClothes = await models.clothes.findAll({
    attributes: ["key"],
  });

  const allClothesKeys = allClothes.map((item) => item.key);

  const existClothes = {
    men: [],
    women: [],
    child: [],
  };

  const genders = {
    men: 1,
    women: 2,
    child: 3,
  };

  for (const [gender, genderId] of Object.entries(genders)) {
    const clothesData = await models.clothes_data.findAll({
      where: {
        gender_id: genderId,
        brand_id: brandInfo.id,
      },
      include: [
        {
          model: models.clothes,
          as: "cloth",
          attributes: ["key"],
        },
      ],
      attributes: [],
    });

    const clothesKeys = clothesData.map((item) => item.cloth.key);
    existClothes[gender] = clothesKeys;
  }

  res.json([
    {
      all_clothes: allClothesKeys,
      exist_clothes: existClothes,
    },
  ]);
};
