// models/basketModel.js
import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    count: {
        type: Number,
        required: true,
        min: [1, 'Count cannot be less than 1.'],
        default: 1,
    },
}, { timestamps: true });

// Create a compound index to ensure a user can only have a specific product once in their basket
basketSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Basket = mongoose.model('Basket', basketSchema);

export default Basket;