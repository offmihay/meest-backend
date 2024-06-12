module.exports = async (req, res, next, models, sequelize) => {
    const { clothesData } = req.body;

    const transaction = await sequelize.transaction();

    try {
        await models.clothes.destroy({
            where: {},
            transaction
        });


        const newRecords = clothesData.map(item => ({
            id: item.id || undefined,
            key: item.key,
            name: item.name,
            system_category: item.system_category
        }));

        await models.clothes.bulkCreate(newRecords, { transaction });

        await transaction.commit();
        res.json({
            message: 'Clothes data updated successfully',
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error during transaction:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};
