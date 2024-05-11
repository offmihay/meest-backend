const models = require("./../models/init-models");

module.exports = async (req, res, next, models) => {
  const brands = await models.brands.findAll();
  const transformedBrands = brands.map((brand) => ({
    id: brand.id,
    key: brand.key,
    name: brand.name,
    img_url: brand.img_url,
  }));
  res.json(transformedBrands);
};
