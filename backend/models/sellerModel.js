import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    storeName: { type: String, required: true },
    storeDescription: { type: String }
}, { timestamps: true });

export const Seller = mongoose.model('Seller', sellerSchema);
