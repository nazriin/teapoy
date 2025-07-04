// models/wishlistModel.js
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model
            required: [true, 'User ID is required'],
            index: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Assuming you have a Product model
            required: [true, 'Product ID is required'],
        }
    },
    { timestamps: true }
);

// Ensure that a user can only have a specific product once in their wishlist
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);