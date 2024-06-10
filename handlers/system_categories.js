module.exports = async (req, res, next, models) => {
  const brands = await models.system_categories.findAll()
  res.json(
    brands.map(item => ({
      id: item.id,
      key: item.key,
      name: item.name,
    })),
  )
}
