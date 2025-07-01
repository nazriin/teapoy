import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
            required: true,
            index: true
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity must be at least 1"]
                },
                price: {
                    type: Number,
                    required: true,
                    min: [0, "Price cannot be negative"]
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total amount cannot be negative"]
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        },
        shippingAddress: {
            street: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            state: { type: String, required: true, trim: true },
            postalCode: { type: String, required: true, trim: true },
            country: { type: String, required: true, trim: true }
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed", "Refunded"],
            default: "Pending"
        },
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "PayPal", "Bank Transfer"],
            required: true
        }
    },
    { timestamps: true }
);

orderSchema.index({ buyerId: 1, sellerId: 1 });
const Order = mongoose.model("Order", orderSchema);

export default Order;