module.exports = async (req, res, next, models) => {
  const { system_category } = req.query

  // Check if the body part parameter is present
  if (!system_category) {
    return res
      .status(400)
      .json({ error: 'Missing required parameter: system_category' })
  }

  // Query the database for conversion records for the specified body part
  const systemConversionsRecords = await models.system_conversions.findAll({
    where: { system_category: system_category },
  })

  let transformedSizes

  if (systemConversionsRecords.length === 0) {
    transformedSizes = []
  } else {
    const conversionGroups = {}
    systemConversionsRecords.forEach(record => {
      if (!conversionGroups[record.conversion_group]) {
        conversionGroups[record.conversion_group] = {}
      }
      conversionGroups[record.conversion_group][record.size_system] =
        record.value
    })

    transformedSizes = Object.entries(conversionGroups).map(([key, value]) => ({
      key,
      ...value,
    }))
  }

  const awailableSystemsModels = await models.size_systems.findAll({
    where: { system_category: system_category },
  })

  const awailableSystems = []
  for (item of awailableSystemsModels) {
    awailableSystems.push(item.size_system)
  }

  // Return the aggregated conversion data
  return res.status(200).json({
    system_category: system_category,
    sizes: transformedSizes,
    awailable_systems: awailableSystems,
  })
}
