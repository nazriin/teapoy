import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, indexChart: true },
        storeName: { type: String, required: true , trim: true },
        storeDescription: { type: String, trim: true },
        bankDetails: {
            accountNumber: { type: String, trim: true },
            bankName: { type: String, trim: true },
            routingNumber: { type: String, trim: true },
        },
        taxId: { type: String, trim: true, sparse: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        ratings: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                rating: { type: Number, required: true, min: 1, max: 5 },
                review: { type: String, trim: true },
            },
        ],
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Ensure unique index with case-insensitive store names
sellerSchema.index({ storeName: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

export default mongoose.model("Seller", sellerSchema);