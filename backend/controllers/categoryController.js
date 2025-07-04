// import Category from '../models/categoryModel.js';
//
// // Create a new category
// export const createCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;
//
//         // Check if category already exists
//         const existingCategory = await Category.findOne({ name });
//         if (existingCategory) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Category with this name already exists'
//             });
//         }
//
//         const category = new Category({
//             name,
//             description
//         });
//
//         await category.save();
//
//         res.status(201).json({
//             success: true,
//             message: 'Category created successfully',
//             data: category
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error creating category',
//             error: error.message
//         });
//     }
// };
//
// // Get all categories
// export const getAllCategories = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const skip = (page - 1) * limit;
//
//         const categories = await Category.find()
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);
//
//         const totalCategories = await Category.countDocuments();
//         const totalPages = Math.ceil(totalCategories / limit);
//
//         res.status(200).json({
//             success: true,
//             message: 'Categories retrieved successfully',
//             data: categories,
//             pagination: {
//                 currentPage: page,
//                 totalPages,
//                 totalItems: totalCategories,
//                 itemsPerPage: limit
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error retrieving categories',
//             error: error.message
//         });
//     }
// };
//
// // Get a single category by ID
// export const getCategoryById = async (req, res) => {
//     try {
//         const { id } = req.params;
//
//         const category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Category not found'
//             });
//         }
//
//         res.status(200).json({
//             success: true,
//             message: 'Category retrieved successfully',
//             data: category
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error retrieving category',
//             error: error.message
//         });
//     }
// };
//
// // Update a category
// export const updateCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description } = req.body;
//
//         // Check if category exists
//         const category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Category not found'
//             });
//         }
//
//         // Check if new name already exists (if name is being updated)
//         if (name && name !== category.name) {
//             const existingCategory = await Category.findOne({ name });
//             if (existingCategory) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Category with this name already exists'
//                 });
//             }
//         }
//
//         const updatedCategory = await Category.findByIdAndUpdate(
//             id,
//             { name, description },
//             { new: true, runValidators: true }
//         );
//
//         res.status(200).json({
//             success: true,
//             message: 'Category updated successfully',
//             data: updatedCategory
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error updating category',
//             error: error.message
//         });
//     }
// };
//
// // Delete a category
// export const deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//
//         const category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Category not found'
//             });
//         }
//
//         await Category.findByIdAndDelete(id);
//
//         res.status(200).json({
//             success: true,
//             message: 'Category deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting category',
//             error: error.message
//         });
//     }
// };
//
// // Search categories by name
// export const searchCategories = async (req, res) => {
//     try {
//         const { q } = req.query;
//
//         if (!q) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Search query is required'
//             });
//         }
//
//         const categories = await Category.find({
//             name: { $regex: q, $options: 'i' }
//         }).sort({ createdAt: -1 });
//
//         res.status(200).json({
//             success: true,
//             message: 'Search completed successfully',
//             data: categories,
//             count: categories.length
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error searching categories',
//             error: error.message
//         });
//     }
// };
//
// // Get category statistics
// export const getCategoryStats = async (req, res) => {
//     try {
//         const totalCategories = await Category.countDocuments();
//         const recentCategories = await Category.countDocuments({
//             createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
//         });
//
//         res.status(200).json({
//             success: true,
//             message: 'Category statistics retrieved successfully',
//             data: {
//                 totalCategories,
//                 recentCategories,
//                 lastWeek: recentCategories
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error retrieving category statistics',
//             error: error.message
//         });
//     }
// };

import Category from '../models/categoryModel.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Input validation
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required and cannot be empty'
            });
        }

        // Normalize name (trim whitespace and convert to lowercase for comparison)
        const normalizedName = name.trim();

        // Check if category already exists (case-insensitive)
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${normalizedName}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        const category = new Category({
            name: normalizedName,
            description: description?.trim() || ''
        });

        await category.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        console.error('Error creating category:', error);

        // Handle specific mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error.message
        });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Validate pagination parameters
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page and limit must be positive numbers'
            });
        }

        const categories = await Category.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalCategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: categories,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalCategories,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving categories',
            error: error.message
        });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category retrieved successfully',
            data: category
        });
    } catch (error) {
        console.error('Error retrieving category:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving category',
            error: error.message
        });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Validate MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }

        // Check if category exists
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Validate and normalize name if provided
        if (name !== undefined) {
            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Category name cannot be empty'
                });
            }

            const normalizedName = name.trim();

            // Check if new name already exists (case-insensitive, excluding current category)
            if (normalizedName.toLowerCase() !== category.name.toLowerCase()) {
                const existingCategory = await Category.findOne({
                    name: { $regex: new RegExp(`^${normalizedName}$`, 'i') },
                    _id: { $ne: id }
                });
                if (existingCategory) {
                    return res.status(400).json({
                        success: false,
                        message: 'Category with this name already exists'
                    });
                }
            }
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description.trim();

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error);

        // Handle specific mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error.message
        });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error.message
        });
    }
};

// Search categories by name
export const searchCategories = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Search query is required and cannot be empty'
            });
        }

        const searchTerm = q.trim();
        const categories = await Category.find({
            name: { $regex: searchTerm, $options: 'i' }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Search completed successfully',
            data: categories,
            count: categories.length
        });
    } catch (error) {
        console.error('Error searching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching categories',
            error: error.message
        });
    }
};

// Get category statistics
export const getCategoryStats = async (req, res) => {
    try {
        const totalCategories = await Category.countDocuments();
        const recentCategories = await Category.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });

        res.status(200).json({
            success: true,
            message: 'Category statistics retrieved successfully',
            data: {
                totalCategories,
                recentCategories,
                lastWeek: recentCategories
            }
        });
    } catch (error) {
        console.error('Error retrieving category statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving category statistics',
            error: error.message
        });
    }
};