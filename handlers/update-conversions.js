module.exports = async (req, res, next, models) => {
  const updates = req.body;

  const firstRecord = updates[0];

  const uniqClothIds = [
    {
      uniq_cloth_id: firstRecord.uniq_cloth_id,
      size_system: firstRecord.size_system,
    },
  ];

  await models.conversions.destroy({
    where: {
      uniq_cloth_id: firstRecord.uniq_cloth_id,
    },
  });

  const sizeTypeIdPromises = uniqClothIds.map(
    async ({ uniq_cloth_id, size_system }) => {
      const clothData = await models.clothes_data.findOne({
        where: { uniq_cloth_id },
      });

      if (!clothData) {
        throw new Error(
          `No cloth data found for uniq_cloth_id ${uniq_cloth_id}`
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
          size_system,
        },
      });

      if (!sizeSystem) {
        throw new Error(
          `No size system found for body_part ${bodyPart} and size_system ${size_system}`
        );
      }

      return { uniq_cloth_id, size_type_id: sizeSystem.id };
    }
  );

  const sizeTypeIds = await Promise.all(sizeTypeIdPromises);

  const updatePromises = updates.map(async (update) => {
    const size_type_id = sizeTypeIds.find(
      (p) => p.uniq_cloth_id === update.uniq_cloth_id
    ).size_type_id;

    const updateWithSizeTypeId = { ...update, size_type_id };
    delete updateWithSizeTypeId.id;

    return models.conversions.create(updateWithSizeTypeId);
  });

  await Promise.all(updatePromises);
  res.status(200).json({ message: "Updates successful" });
};
