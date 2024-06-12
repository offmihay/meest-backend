module.exports = async (req, res, next, models) => {
    try {
        const clothes = await models.clothes.findAll({
            order: [
                ['id', 'ASC']
            ]
        });

        return res.status(200).json({
            clothes,
            isEmpty: clothes.length === 0,
        });
    } catch (error) {
        next(error);
    }
};
