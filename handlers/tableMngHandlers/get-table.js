module.exports = async (req, res, next, models) => {
  const { brand, cloth, gender } = req.query

  if (!brand || !cloth || !gender) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  const [brandRecord, clothRecord, genderRecord] = await Promise.all([
    models.brands.findOne({ where: { key: brand } }),
    models.clothes.findOne({ where: { key: cloth } }),
    models.genders.findOne({ where: { key: gender } }),
  ])

  if (!brandRecord || !clothRecord || !genderRecord) {
    return res.status(404).json({ error: 'Invalid brand, cloth, or gender' })
  }

  const clothesDataRecord = await models.clothes_data.findOne({
    where: {
      brand_id: brandRecord.id,
      cloth_id: clothRecord.id,
      gender_id: genderRecord.id,
    },
  })

  if (!clothesDataRecord) {
    return res.status(404).json({ error: 'No matching clothes data found' })
  }

  const conversions = await models.conversions.findAll({
    where: {
      uniq_cloth_id: clothesDataRecord.uniq_cloth_id,
    },
  })

  const systemDefiniton = await models.system_conversions.findAll({
    where: { system_category: clothRecord.system_category },
  })

  const allSizeSystems = systemDefiniton.map(item => item.size_system)
  const possibleSizeSystems = [...new Set(allSizeSystems)]

  const possibleSizeValues = system =>
    systemDefiniton
      .filter(item => item.size_system === system)
      .map(item => item.value)

  if (!conversions || conversions.length === 0) {
    return res.status(200).json({
      conversions: [
        {
          uniq_cloth_id: clothesDataRecord.uniq_cloth_id,
          size_system: possibleSizeSystems[0],
        },
      ],
      possibleSizeSystems: possibleSizeSystems,
      possibleSizeValues: possibleSizeSystems.reduce((acc, item) => {
        acc[item] = possibleSizeValues(item)
        return acc
      }, {}),
      isEmpty: true,
    })
  }

  const sizeTypeIds = conversions.map(conv => conv.size_type_id)
  const sizeSystems = await models.size_systems.findAll({
    where: {
      id: sizeTypeIds,
    },
  })

  const sizeSystemMap = sizeSystems.reduce((acc, system) => {
    acc[system.id] = system.size_system
    return acc
  }, {})

  const conversionData = conversions.map(conversion => ({
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
  }))

  return res.status(200).json({
    conversions: conversionData,
    possibleSizeSystems: possibleSizeSystems,
    possibleSizeValues: possibleSizeSystems.reduce((acc, item) => {
      acc[item] = possibleSizeValues(item)
      return acc
    }, {}),
    isEmpty: false,
  })
}
