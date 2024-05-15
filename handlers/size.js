module.exports = async (req, res, next, models) => {
    try {
        const { brand, cloth, gender, inputData } = req.body;
        console.log(inputData)

        if (!brand || !cloth || !gender || !inputData) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const brandRecord = await models.brands.findOne({ where: { key: brand } });
        const clothRecord = await models.clothes.findOne({ where: { key: cloth } });
        const genderRecord = await models.genders.findOne({ where: { key: gender } });

        if (!brandRecord || !clothRecord || !genderRecord) {
            return res.status(404).json({ error: "Invalid brand, cloth, or gender" });
        }

        const clothesDataRecord = await models.clothes_data.findOne({
            where: {
                brand_id: brandRecord.id,
                cloth_id: clothRecord.id,
                gender_id: genderRecord.id
            }
        });

        if (!clothesDataRecord) {
            return res.status(404).json({ error: "No matching clothes data found" });
        }

        console.log(inputData)

        const queryWhereClause = {
            uniq_cloth_id: clothesDataRecord.uniq_cloth_id
        };
        
        for (const [key, value] of Object.entries(inputData)) {
            queryWhereClause[key] = parseFloat(value);
        }
        
        const conversionRecord = await models.conversions.findOne({
            where: queryWhereClause
        });

        if (!conversionRecord) {
            return res.status(404).json({ error: "No size conversion found for the given foot length" });
        }

        return res.status(200).json({ size: conversionRecord.size_value });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching the size" });
    }
};
