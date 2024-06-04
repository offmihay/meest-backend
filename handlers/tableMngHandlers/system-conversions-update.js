module.exports = async (req, res, next, models, sequelize) => {
    const { body_part } = req.query;
    const transaction = await sequelize.transaction();
    if (!body_part) {
        return res.status(400).json({ error: "Missing required query parameters: body_part" });
    }

    const newSizes = req.body;

    const isValidSize = (size) => {
        const validKeys = ["INT", "EU", "UK", "US", "conversion_group"];
        const requiredKeys = ["INT", "EU", "UK", "US"];

        for (const key of requiredKeys) {
            if (!size.hasOwnProperty(key)) {
                return false;
            }
        }

        for (const key of Object.keys(size)) {
            if (!validKeys.includes(key)) {
                return false;
            }
        }

        return true;
    };

    if (!Array.isArray(newSizes) || !newSizes.every(isValidSize)) {
        return res.status(400).json({ error: "Invalid format for newSizes array" });
    }

    try {
        await models.system_conversions.destroy({
            where: { body_part: body_part }
        }, { transaction });

        const OldSizeSystem = await models.system_conversions.findAll();

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
        await models.system_conversions.bulkCreate(formattedSizes, { transaction });
        await transaction.commit();
        res.status(200).json({ message: "Records replaced successfully" });
    } catch (error) {
        console.error('Error during replacing records:', error);
        await transaction.rollback();
        res.status(500).json({ error: "An error occurred while replacing records" });
    }
};
