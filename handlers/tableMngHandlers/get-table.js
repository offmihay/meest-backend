module.exports = async (req, res, next, models) => {
  const { brand, cloth, gender } = req.query;

  if (!brand || !cloth || !gender) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const [brandRecord, clothRecord, genderRecord] = await Promise.all([
    models.brands.findOne({ where: { key: brand } }),
    models.clothes.findOne({ where: { key: cloth } }),
    models.genders.findOne({ where: { key: gender } }),
  ]);

  if (!brandRecord || !clothRecord || !genderRecord) {
    return res.status(404).json({ error: "Invalid brand, cloth, or gender" });
  }

  const clothesDataRecord = await models.clothes_data.findOne({
    where: {
      brand_id: brandRecord.id,
      cloth_id: clothRecord.id,
      gender_id: genderRecord.id,
    },
  });

  if (!clothesDataRecord) {
    return res.status(404).json({ error: "No matching clothes data found" });
  }

  const conversions = await models.conversions.findAll({
    where: {
      uniq_cloth_id: clothesDataRecord.uniq_cloth_id,
    },
  });

  const possibleSizeSystems = await models.size_systems.findAll({
    where: {
      body_part: clothRecord.body_part,
    },
    attributes: ["size_system"],
    group: ["size_system"],
  });

  const possibleSizeValues = await models.allowed_size_values.findAll({
    attributes: ["value"],
  });

  if (!conversions || conversions.length === 0) {
    return res.status(200).json({
      conversions: [
        {
          uniq_cloth_id: clothesDataRecord.uniq_cloth_id,
          height: null,
          head_length: null,
          chest_length: null,
          waist_length: null,
          hip_length: null,
          pants_length: null,
          foot_length: null,
          size_system: "INT",
        },
      ],
      possibleSizeSystems: possibleSizeSystems.map(
        (system) => system.size_system
      ),
      possibleSizeValues: possibleSizeValues.map((value) => value.value),
      isEmpty: true,
    });
  }

  const sizeTypeIds = conversions.map((conv) => conv.size_type_id);
  const sizeSystems = await models.size_systems.findAll({
    where: {
      id: sizeTypeIds,
    },
  });

  const sizeSystemMap = sizeSystems.reduce((acc, system) => {
    acc[system.id] = system.size_system;
    return acc;
  }, {});

  const conversionData = conversions.map((conversion) => ({
    id: conversion.id,
    uniq_cloth_id: conversion.uniq_cloth_id,
    height: conversion.height,
    head_length: conversion.head_length,
    chest_length: conversion.chest_length,
    waist_length: conversion.waist_length,
    hip_length: conversion.hip_length,
    pants_length: conversion.pants_length,
    foot_length: conversion.foot_length,
    size_system: sizeSystemMap[conversion.size_type_id] || null,
    size_value: conversion.size_value,
  }));

  return res.status(200).json({
    conversions: conversionData,
    possibleSizeSystems: possibleSizeSystems.map(
      (system) => system.size_system
    ),
    possibleSizeValues: possibleSizeValues.map((value) => value.value),
    isEmpty: false,
  });
};
