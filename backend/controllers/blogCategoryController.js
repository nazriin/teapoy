// /controllers/blogCategoryController.js

import BlogCategory from '../models/blogCategoryModel.js';

// Yeni kateqoriya yaratmaq
export const createBlogCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new BlogCategory({ name });
        await category.save();
        res.status(201).json({ success: true, message: "Kateqoriya uğurla yaradıldı", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Bütün kateqoriyaları gətirmək
export const getAllBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find({}).sort({ name: 1 });
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Kateqoriyanı ID ilə gətirmək
export const getBlogCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await BlogCategory.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Kateqoriya tapılmadı" });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Kateqoriyanı yeniləmək
export const updateBlogCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await BlogCategory.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ success: false, message: "Kateqoriya tapılmadı" });
        }
        res.status(200).json({ success: true, message: "Kateqoriya uğurla yeniləndi", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Kateqoriyanı silmək
export const deleteBlogCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await BlogCategory.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Kateqoriya tapılmadı" });
        }
        res.status(200).json({ success: true, message: "Kateqoriya uğurla silindi" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};