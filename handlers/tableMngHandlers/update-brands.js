module.exports = async (req, res, next, models, sequelize) => {
  const { id, key, name, img_url, men_clothes, women_clothes, child_clothes } =
    req.body;

  if (!id || !key || !name || !img_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transaction = await sequelize.transaction();

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

    const createOrUpdateClothesData = async (clothes, genderId) => {
      for (const cloth of clothes) {
        const clothId = clothesMap[cloth];
        const existingEntry = await models.clothes_data.findOne({
          where: { cloth_id: clothId, gender_id: genderId, brand_id: id },
          transaction,
        });

        if (existingEntry) {
          await existingEntry.update({ is_active: true }, { transaction });
        } else {
          await models.clothes_data.create(
            {
              cloth_id: clothId,
              gender_id: genderId,
              brand_id: id,
              is_active: true,
            },
            { transaction }
          );
        }
      }
    };

    // Mark all existing clothes_data entries as inactive
    await models.clothes_data.update(
      { is_active: false },
      { where: { brand_id: id }, transaction }
    );

    // Create or update entries
    await createOrUpdateClothesData(men_clothes, 1);
    await createOrUpdateClothesData(women_clothes, 2);
    await createOrUpdateClothesData(child_clothes, 3);

    await transaction.commit();
    res.json({
      message: "Brand and related clothes data updated successfully",
    });
};
