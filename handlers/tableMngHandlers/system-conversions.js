module.exports = async (req, res, next, models) => {
    const { body_part } = req.query;

    if (!body_part) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const system_conversionsRecord = await models.system_conversions.findAll({ where: { body_part: body_part } });

    if (!system_conversionsRecord) {
        return res.status(404).json({ error: "Invalid brand, cloth, or gender" });
    }

    // const aggregateSizes = {};
    // system_conversionsRecord.forEach(record => {

    //     if (!aggregateSizes[record.size_system]) {
    //         aggregateSizes[record.size_system] = [];
    //     }
    //     aggregateSizes[record.size_system].push(record.value);
    // });
    const conversionGroups = {};

    system_conversionsRecord.forEach(record => {
        if (!conversionGroups[record.conversion_group]) {
            conversionGroups[record.conversion_group] = {};
        }
        conversionGroups[record.conversion_group][record.size_system] = record.value;
    });

    const aggregateSizes = Object.values(conversionGroups);


    return res.status(200).json(aggregateSizes);

};