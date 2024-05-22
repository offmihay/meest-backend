module.exports = async (req, res, next, models, sequelize) => {
  const { id, key, name, img_url, men_clothes, women_clothes, child_clothes } =
    req.body;

  if (!id || !key || !name || !img_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transaction = await sequelize.transaction();

  try {
    // Update brand information
    await models.brands.update(
      { key, name, img_url },
      { where: { id }, transaction }
    );

    // Get clothes IDs
    const clothes = await models.clothes.findAll({
      where: {
        key: [...men_clothes, ...women_clothes, ...child_clothes],
      },
      transaction,
    });

    const clothesMap = clothes.reduce((acc, item) => {
      acc[item.key] = item.id;
      return acc;
    }, {});

    // Prepare new clothes_data entries
    const menEntries = men_clothes.map((cloth) => ({
      cloth_id: clothesMap[cloth],
      gender_id: 1,
      brand_id: id,
    }));

    const womenEntries = women_clothes.map((cloth) => ({
      cloth_id: clothesMap[cloth],
      gender_id: 2,
      brand_id: id,
    }));

    const childEntries = child_clothes.map((cloth) => ({
      cloth_id: clothesMap[cloth],
      gender_id: 3,
      brand_id: id,
    }));

    const clothesDataToDelete = await models.clothes_data.findAll({
      where: { brand_id: id },
      transaction,
    });

    const clothesDataIds = clothesDataToDelete.map(
      (item) => item.uniq_cloth_id
    );

    await models.conversions.destroy({
      where: { uniq_cloth_id: clothesDataIds },
      transaction,
    });

    await models.clothes_data.destroy({
      where: { brand_id: id },
      transaction,
    });

    await models.clothes_data.bulkCreate(
      [...menEntries, ...womenEntries, ...childEntries],
      { transaction }
    );

    await transaction.commit();
    res.json({
      message: "Brand and related clothes data updated successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
