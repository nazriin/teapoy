import { Product } from '../models/productModel.js';
import { Seller } from '../models/sellerModel.js';

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, imageUrl } = req.body;
        const seller = await Seller.findOne({ user: req.user._id });
        if (!seller) {
            return res.status(400).json({ message: 'Seller not found' });
        }

        const product = new Product({
            seller: seller._id,
            name,
            description,
            price,
            stock,
            category,
            imageUrl: imageUrl || 'https://via.placeholder.com/150',
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSellerProducts = async (req, res) => {
    try {
        const seller = await Seller.findOne({ user: req.user._id });
        if (!seller) {
            return res.status(400).json({ message: 'Seller not found' });
        }

        const products = await Product.find({ seller: seller._id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const seller = await Seller.findOne({ user: req.user._id });
        if (!seller) {
            return res.status(400).json({ message: 'Seller not found' });
        }

        const product = await Product.findOne({ _id: productId, seller: seller._id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        Object.assign(product, req.body);
        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const seller = await Seller.findOne({ user: req.user._id });
        if (!seller) {
            return res.status(400).json({ message: 'Seller not found' });
        }

        const product = await Product.findOneAndDelete({ _id: productId, seller: seller._id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query; // URL-dən 'category' parametrini alırıq (məs: /api/product/all?category=categoryId)
        const filter = {};

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter); // Populates category info from productModel pre-hook
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};