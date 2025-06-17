export const createSellerValidation = async (req, res, next) => {
    try {
        await createSellerSchema.parseAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};