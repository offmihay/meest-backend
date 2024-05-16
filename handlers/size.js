module.exports = async (req, res, next, models) => {
    try {
        const { brand, cloth, gender, inputData } = req.body;


        if (!brand || !cloth || !gender || !inputData) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const [brandRecord, clothRecord, genderRecord] = await Promise.all([
          models.brands.findOne({ where: { key: brand } }),
          models.clothes.findOne({ where: { key: cloth } }),
          models.genders.findOne({ where: { key: gender } }),
        ]);

        if (!brandRecord || !clothRecord || !genderRecord) {
          return res
            .status(404)
            .json({ error: "Invalid brand, cloth, or gender" });
        }

        const clothesDataRecord = await models.clothes_data.findOne({
          where: {
            brand_id: brandRecord.id,
            cloth_id: clothRecord.id,
            gender_id: genderRecord.id,
          },
        });

        if (!clothesDataRecord) {
          return res
            .status(404)
            .json({ error: "No matching clothes data found" });
        }

        const conversions = await models.conversions.findAll({
          where: {
            uniq_cloth_id: clothesDataRecord.uniq_cloth_id,
          },
        });

        let nearestConversion = null;
        let minDistance = Number.MAX_VALUE;

        for (const conversion of conversions) {
          let distance = 0;

          for (const [key, value] of Object.entries(inputData)) {
            const conversionValue = parseFloat(conversion[key]);
            const inputValue = parseFloat(value);
            distance += Math.abs(conversionValue - inputValue);
          }

          if (distance < minDistance) {
            minDistance = distance;
            nearestConversion = conversion;
          }
        }

        if (!nearestConversion) {
          return res
            .status(404)
            .json({
              error: "No size conversion found for the given parameters",
            });
        }
        const bodyParameters = [
          "height",
          "head_length",
          "chest_length",
          "waist_length",
          "hip_length",
          "foot_length",
          "pants_length",
        ];
        const bodyParamsData = {};

        for (const param of bodyParameters) {
          if (nearestConversion[param] != null) {
            bodyParamsData[param] = nearestConversion[param];
          }
        }

        return res.status(200).json({ 
            id: nearestConversion.id,
            size: nearestConversion.size_value,
            body_parameters: bodyParamsData
        });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: "An error occurred while fetching the size" });
    }
};
