import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 }); // Sort alphabetically
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ categoryId }).populate('categoryId', 'name');
        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this category' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
