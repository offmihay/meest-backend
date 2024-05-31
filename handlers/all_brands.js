module.exports = async (req, res, next, models) => {
  const brands = await models.brands.findAll();
  const transformedBrands = brands.map((brand) => ({
    id: brand.id,
    key: brand.key,
    name: brand.name,
    img_url: brand.img_url,
    is_active: brand.is_active,
  }));
  transformedBrands.sort((a, b) => a.id - b.id);
  res.json(transformedBrands);
};
