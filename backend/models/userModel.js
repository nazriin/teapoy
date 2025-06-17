import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        name: { type: String, required: true },
        email: { type: String, required: true , lowercase: true },
        password: { type: String, required: false },
        surname: { type: String },
        role: { type: String, required: true, enum: ["user", "seller", "admin"], default: "user" },
        phone: { type: String },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            zipCode: { type: String },
        },
        googleId: { type: String, unique: true, sparse: true },
        cart: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1, min: 1 },
            },
        ],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    },
    { timestamps: true }
);

// Ensure unique index with case-insensitive emails
userSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password") || !this.password) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

const User= mongoose.model("User", userSchema);
export default User;