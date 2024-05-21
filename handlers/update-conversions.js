module.exports = async (req, res, next, models) => {
  const updates = req.body;

  try {
    const uniqClothIds = [
      ...new Set(updates.map((update) => update.uniq_cloth_id)),
    ];

    await models.conversions.destroy({
      where: {
        uniq_cloth_id: uniqClothIds,
      },
    });

    const updatePromises = updates.map(async (update) => {
      const clothData = await models.clothes_data.findOne({
        where: { uniq_cloth_id: update.uniq_cloth_id },
      });

      if (!clothData) {
        throw new Error(
          `No cloth data found for uniq_cloth_id ${update.uniq_cloth_id}`
        );
      }

      const clothId = clothData.cloth_id;

      const cloth = await models.clothes.findOne({
        where: { id: clothId },
      });

      if (!cloth) {
        throw new Error(`No cloth found for cloth_id ${clothId}`);
      }

      const bodyPart = cloth.body_part;

      const sizeSystem = await models.size_systems.findOne({
        where: {
          body_part: bodyPart,
          size_system: update.size_system,
        },
      });

      if (!sizeSystem) {
        throw new Error(
          `No size system found for body_part ${bodyPart} and size_system ${update.size_system}`
        );
      }

      const sizeTypeId = sizeSystem.id;

      const updateWithSizeTypeId = { ...update, size_type_id: sizeTypeId };
      delete updateWithSizeTypeId.id;

      return models.conversions.create(updateWithSizeTypeId);
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: "Updates successful" });
  } catch (error) {
    res.status(500).json({ error: `Update failed: ${error.message}` });
  }
};
