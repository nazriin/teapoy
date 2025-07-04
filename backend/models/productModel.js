import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    name: {
        type: String,
        required: [true, "Product name is required."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [0, "Price cannot be negative."]
    },
    stock: {
        type: Number,
        required: [true, "Stock quantity is required."],
        min: [0, "Stock cannot be negative."]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Product category is required."]
    },
    imageUrl: {
        type: String,
        default: 'https://placehold.co/600x400/EEE/31343C?text=No+Image'
    },
}, { timestamps: true });

// Populate the category details whenever a product is found
productSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'category',
        select: 'name'
    });
    next();
});


export const Product = mongoose.model('Product', productSchema);
