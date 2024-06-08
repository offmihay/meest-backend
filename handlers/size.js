module.exports = async (req, res, next, models) => {
  const { brand, cloth, gender, size_system, inputData } = req.body

  if (!brand || !cloth || !gender || !inputData || !size_system) {
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

  if (!conversions.length) {
    return res
      .status(404)
      .json({ error: 'No size conversion found for the given parameters' })
  }

  function findClothingSize(bodyMeasurements, sizeChart) {
    let bestSize = null
    let minDistance = Infinity

    for (const size of sizeChart) {
      let distance = 0
      let fits = true

      for (const key of Object.keys(bodyMeasurements)) {
        if (size[key]) {
          const sizeValue = parseFloat(size[key])
          const bodyValue = parseFloat(bodyMeasurements[key])
          if (bodyValue > sizeValue) {
            fits = false // If the body measurement is greater than the size measurement, it won't fit
            break
          }
          distance += Math.abs(sizeValue - bodyValue)
        }
      }

      if (fits && distance < minDistance) {
        minDistance = distance
        bestSize = size
      }
    }

    return bestSize
  }

  const nearestConversion = findClothingSize(inputData, conversions)

  if (!nearestConversion) {
    return res
      .status(404)
      .json({ error: 'No size conversion found for the given parameters' })
  }

  const bodyParameters = [
    'height',
    'head_length',
    'chest_length',
    'waist_length',
    'hip_length',
    'foot_length',
    'pants_length',
  ]
  const bodyParamsData = {}

  for (const param of bodyParameters) {
    if (nearestConversion[param] != null) {
      bodyParamsData[param] = nearestConversion[param]
    }
  }

  const sizeSystemRecord = await models.size_systems.findOne({
    where: {
      id: nearestConversion.size_type_id,
    },
  })

  if (!sizeSystemRecord) {
    return res.status(404).json({ error: 'Invalid size system' })
  }

  const systemConversionsRecord = await models.system_conversions.findOne({
    where: {
      body_part: sizeSystemRecord.body_part,
      size_system: sizeSystemRecord.size_system,
      value: nearestConversion.size_value,
    },
  })

  if (!systemConversionsRecord) {
    return res
      .status(404)
      .json({ error: 'Not found conversion for this size system' })
  }

  const systemConversionsGroupsRecord = await models.system_conversions.findOne(
    {
      where: {
        conversion_group: systemConversionsRecord.conversion_group,
        size_system: size_system,
      },
    },
  )

  if (!systemConversionsGroupsRecord) {
    return res
      .status(404)
      .json({ error: 'Not found conversion group for this size system' })
  }

  return res.status(200).json({
    id: nearestConversion.id,
    size_system: systemConversionsGroupsRecord.size_system,
    size: systemConversionsGroupsRecord.value,
    body_parameters: bodyParamsData,
  })
}
