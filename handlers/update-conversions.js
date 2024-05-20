module.exports = async (req, res, next, models) => {
  const updates = req.body;

  if (!Array.isArray(updates)) {
    return res
      .status(400)
      .json({ error: "Body should be an array of updates" });
  }

  for (const update of updates) {
    const requiredFields = [
      "uniq_cloth_id",
      "height",
      "head_length",
      "chest_length",
      "waist_length",
      "hip_length",
      "pants_length",
      "foot_length",
      "size_type_id",
      "size_value",
    ];

    for (const field of requiredFields) {
      if (!update.hasOwnProperty(field)) {
        return res
          .status(400)
          .json({ error: `Missing field ${field} in one of the updates` });
      }
    }
  }

  const updatePromises = updates.map(async (update) => {
    if (update.id) {
      const conversion = await models.conversions.findOne({
        where: { id: update.id },
      });
      if (conversion) {
        return models.conversions.update(update, {
          where: { id: update.id },
        });
      } else {
        return models.conversions.create(update);
      }
    } else {
      return models.conversions.create(update);
    }
  });

  await Promise.all(updatePromises);

  res.status(200).json({ message: "Updates successful" });
};
