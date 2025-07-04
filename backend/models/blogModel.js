// /models/blogModel.js

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog başlığı mütləqdir."],
        trim: true,
        unique: true,
    },
    content: {
        type: String,
        required: [true, "Blog məzmunu mütləqdir."],
    },
    imageUrl: {
        type: String,
        trim: true,
        default: 'https://via.placeholder.com/800x400.png?text=Blog+Şəkli'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory', // BlogCategory modelinə referans
        required: [true, "Blog kateqoriyası mütləqdir."],
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;