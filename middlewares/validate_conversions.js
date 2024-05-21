module.exports = () => async (req, res, next) => {
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
      "size_system",
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

  next();
};
