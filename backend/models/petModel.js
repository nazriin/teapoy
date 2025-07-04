// models/petModel.js
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet name is required."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Pet description is required."],
        trim: true,
    },
    breed: {
        type: String,
        required: [true, "Pet breed is required."],
        trim: true,
    },
    age: { // Changed to String
        type: String,
        required: [true, "Pet age is required."],
        trim: true, // Trim whitespace for string age
    },
    image: {
        type: String,
        default: 'https://placehold.co/600x400/EEE/31343C?text=No+Image',
    },
    information: {
        type: [String],
        default: [],
    },
    isAdopted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const Pet = mongoose.model('Pet', petSchema);