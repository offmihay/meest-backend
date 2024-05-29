module.exports = async (req, res, next, models) => {
    const { body_part } = req.query;

    if (!body_part) {
        return res.status(400).json({ error: "Missing required query parameters: body_part" });
    }

    const newSizes = req.body;

    try {
        // Delete existing records
        await models.system_conversions.destroy({
            where: { body_part: body_part }
        });

        const OldSizeSystem = await models.system_conversions.findAll({
            // where: {
            //     body_part: body_part,
            // },
        });

        let maxConversionGroup = Math.max(
            ...OldSizeSystem.map(size => size.conversion_group)
        );


        console.log(maxConversionGroup)
        const formattedSizes = newSizes.flatMap(size => {
                if (!size.conversion_group) {
                    size.conversion_group = ++maxConversionGroup;
                }
            const { conversion_group, ...rest } = size;
            return Object.entries(rest).map(([system, value]) => {
                return {
                    conversion_group: conversion_group,
                    body_part: body_part,
                    size_system: system,
                    value: value
                };
            });
        });
        //
        console.log(formattedSizes);
        await models.system_conversions.bulkCreate(formattedSizes);

        res.status(200).json({ message: "Records replaced successfully" });
    } catch (error) {
        console.error('Error during replacing records:', error);
        res.status(500).json({ error: "An error occurred while replacing records" });
    }
};
