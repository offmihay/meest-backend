module.exports = async (req, res, next, models, sequelize) => {
  const { id, key, name, img_url, men_clothes, women_clothes, child_clothes } =
    req.body
  const is_active = 'is_active' in req.body ? req.body.is_active : false

  if (!key || !name || !img_url) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const transaction = await sequelize.transaction()

  try {
    let brandId = id

    if (brandId != null) {
      await models.brands.update(
        { key, name, img_url, is_active },
        { where: { id: brandId }, transaction },
      )
    } else {
      const brand = await models.brands.create(
        { key, name, img_url, is_active },
        { transaction },
      )
      brandId = brand.id // Get the id of the newly created brand
    }

    // Get clothes IDs
    const clothes = await models.clothes.findAll({
      where: {
        key: [...men_clothes, ...women_clothes, ...child_clothes],
      },
      transaction,
    })

    const clothesMap = clothes.reduce((acc, item) => {
      acc[item.key] = item.id
      return acc
    }, {})

    const createOrUpdateClothesData = async (clothes, genderId) => {
      for (const cloth of clothes) {
        const clothId = clothesMap[cloth]
        const existingEntry = await models.clothes_data.findOne({
          where: { cloth_id: clothId, gender_id: genderId, brand_id: brandId },
          transaction,
        })

        if (existingEntry) {
          await existingEntry.update({ is_active: true }, { transaction })
        } else {
          await models.clothes_data.create(
            {
              cloth_id: clothId,
              gender_id: genderId,
              brand_id: brandId,
              is_active: true,
            },
            { transaction },
          )
        }
      }
    }

    await models.clothes_data.update(
      { is_active: false },
      { where: { brand_id: brandId }, transaction },
    )

    // Create or update entries
    await createOrUpdateClothesData(men_clothes, 1)
    await createOrUpdateClothesData(women_clothes, 2)
    await createOrUpdateClothesData(child_clothes, 3)

    await transaction.commit()
    res.json({
      message: 'Brand and related clothes data updated successfully',
    })
  } catch (error) {
    await transaction.rollback()
    console.error('Error during transaction:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' })
  }
}
