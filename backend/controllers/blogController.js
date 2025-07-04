// /controllers/blogController.js

import Blog from '../models/blogModel.js';

// Yeni blog yaratmaq
export const createBlog = async (req, res) => {
    try {
        const { title, content, imageUrl, category } = req.body;
        const blog = new Blog({
            title,
            content,
            imageUrl,
            category,
        });
        await blog.save();
        const populatedBlog = await Blog.findById(blog._id).populate('category', 'name');
        res.status(201).json({ success: true, message: "Blog uğurla yaradıldı", data: populatedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Bütün blogları gətirmək
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('category', 'name').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Blogu yeniləmək
export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, content, imageUrl, category } = req.body;

        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content, imageUrl, category },
            { new: true, runValidators: true }
        ).populate('category', 'name');

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog tapılmadı" });
        }
        res.status(200).json({ success: true, message: "Blog uğurla yeniləndi", data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Blogu silmək
export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog tapılmadı" });
        }
        res.status(200).json({ success: true, message: "Blog uğurla silindi" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};

// Blogu ID-yə görə gətirmək
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId).populate('category', 'name');

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog tapılmadı" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Yanlış Blog ID formatı" });
        }
        res.status(500).json({ success: false, message: "Server xətası: " + error.message });
    }
};