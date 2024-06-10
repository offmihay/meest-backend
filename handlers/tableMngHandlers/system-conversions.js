module.exports = async (req, res, next, models) => {
  const { body_part } = req.query

  // Check if the body part parameter is present
  if (!body_part) {
    return res
      .status(400)
      .json({ error: 'Missing required parameter: body_part' })
  }

  // Query the database for conversion records for the specified body part
  const systemConversionsRecords = await models.system_conversions.findAll({
    where: { body_part: body_part },
  })

  // Check if the query returned an empty array
  if (systemConversionsRecords.length === 0) {
    return res
      .status(404)
      .json({ error: 'No conversions found for the specified body part' })
  }

  const conversionGroups = {}

  // Aggregate conversion records by conversion group
  systemConversionsRecords.forEach(record => {
    if (!conversionGroups[record.conversion_group]) {
      conversionGroups[record.conversion_group] = {}
    }
    conversionGroups[record.conversion_group][record.size_system] = record.value
  })

  const transformedSizes = Object.entries(conversionGroups).map(
    ([key, value]) => ({
      key,
      ...value,
    }),
  )

  const awailableSystemsModels = await models.size_systems.findAll({
    where: { body_part: body_part },
  })

  const awailableSystems = []
  for (item of awailableSystemsModels) {
    awailableSystems.push(item.size_system)
  }

  // Return the aggregated conversion data
  return res.status(200).json({
    body_part: body_part,
    sizes: transformedSizes,
    awailable_systems: awailableSystems,
  })
}
