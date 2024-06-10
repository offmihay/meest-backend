const sequelize = require('../db_connection')
var initModels = require('../models/init-models')

module.exports = async (req, res, next, models) => {
  const { gender, brand } = req.query
  if (!gender || !brand) {
    return res
      .status(400)
      .json({ error: 'Gender or brand parameter is missing' })
  }

  const genderInfo = await models.genders.findOne({ where: { key: gender } })
  if (!genderInfo) {
    return res.status(400).json({ error: 'Invalid gender key' })
  }

  const brandInfo = await models.brands.findOne({ where: { key: brand } })
  if (!brandInfo) {
    return res.status(400).json({ error: 'Invalid brand key' })
  }

  const clothesData = await models.clothes_data.findAll({
    where: {
      gender_id: genderInfo.id,
      brand_id: brandInfo.id,
      is_active: true,
    },
    attributes: ['uniq_cloth_id', 'cloth_id'],
  })

  const clothesResponse = []

  for (const cloth of clothesData) {
    const conversion = await models.conversions.findOne({
      where: { uniq_cloth_id: cloth.uniq_cloth_id },
    })

    const bodyParts = []
    const bodyParameters = [
      'height',
      'head_length',
      'chest_length',
      'waist_length',
      'hip_length',
      'foot_length',
      'pants_length',
    ]
    for (const parameter of bodyParameters) {
      if (conversion && conversion[parameter] !== null) {
        bodyParts.push(parameter)
      }
    }

    const clothDefinition = await models.clothes.findOne({
      where: { id: cloth.cloth_id },
    })

    const systemDefiniton = await models.system_conversions.findAll({
      where: { system_category: clothDefinition.system_category },
    })

    const sizeSystems = systemDefiniton.map(def => def.size_system)
    const uniqueSizeSystems = [...new Set(sizeSystems)]

    let uniqueSizeSystemsNames = {}

    for (i of uniqueSizeSystems) {
      let temp = await models.size_systems.findOne({
        where: { size_system: i },
      })
      uniqueSizeSystemsNames[i] = temp.name
    }

    if (clothDefinition) {
      clothesResponse.push({
        key: clothDefinition.key,
        name: clothDefinition.name,
        body_parts: bodyParts,
        unique_size_systems: uniqueSizeSystemsNames,
      })
    }
  }

  res.json(clothesResponse)
}
