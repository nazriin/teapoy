// /models/blogCategoryModel.js

import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Kateqoriya adı mütləqdir."],
        trim: true,
        unique: true,
    }
}, { timestamps: true });

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);

export default BlogCategory;