// servicesModel.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Service name is required."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Service description is required."],
        trim: true
    },
    longDescription: {
        type: String,
        required: [true, "Long description is required."],
        trim: true
    },
    price: {
        type: String, // Storing as string to accommodate "$25/day", "$45/session"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: {
        type: Number,
        min: 0,
        default: 0
    },
    features: {
        type: [String], // Array of strings for features
        default: []
    },
    gallery: {
        type: [String], // Array of strings for image URLs
        default: ['https://placehold.co/600x400/EEE/31343C?text=No+Image']
    },
    icon: {
        type: String, // Storing icon names or paths
        required: [true, "Service icon is required."]
    }
}, { timestamps: true });

export const Service = mongoose.model('Service', serviceSchema);