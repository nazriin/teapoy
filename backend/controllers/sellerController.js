import { z } from "zod";
import Seller from "../models/sellerModel.js";
import User from "../models/userModel.js";

const createSellerSchema = z.object({
    userId: z.string(),
    storeName: z.string(),
    storeDescription: z.string().optional(),
    bankDetails: z
        .object({
            accountNumber: z.string().optional(),
            bankName: z.string().optional(),
            routingNumber: z.string().optional(),
        })
        .optional(),
    taxId: z.string().optional(),
});

const updateSellerSchema = z.object({
    storeName: z.string().optional(),
    storeDescription: z.string().optional(),
    bankDetails: z
        .object({
            accountNumber: z.string().optional(),
            bankName: z.string().optional(),
            routingNumber: z.string().optional(),
        })
        .optional(),
    taxId: z.string().optional(),
    verified: z.boolean().optional(),
});

const createSeller = async (req, res) => {
    const result = createSellerSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const { userId, storeName, storeDescription, bankDetails, taxId } = result.data;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") return res.status(400).json({ error: "Valid seller user required" });

    const existingSeller = await Seller.findOne({ storeName });
    if (existingSeller) return res.status(400).json({ error: "Store name already exists" });

    const newSeller = await Seller.create({
        userId,
        storeName,
        storeDescription,
        bankDetails,
        taxId,
    });

    res.status(201).json({
        message: "Seller created successfully",
        seller: { id: newSeller._id, storeName, userId },
    });
};

const getSeller = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });

    const seller = await Seller.findById(id).populate("userId", "name email").select("storeName storeDescription verified");
    if (!seller) return res.status(404).json({ error: "Seller not found" });

    res.status(200).json(seller);
};

const getAllSellers = async (req, res) => {
    const { storeName } = req.query;
    const filter = storeName ? { storeName: { $regex: storeName, $options: "i" } } : {};

    try {
        const sellers = await Seller.find(filter).populate("userId", "name email").select("storeName storeDescription verified");
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch sellers" });
    }
};

const updateSeller = async (req, res) => {
    const { id } = req.params;
    const result = updateSellerSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const seller = await Seller.findById(id);
    if (!seller) return res.status(404).json({ error: "Seller not found" });

    const updatedSeller = await Seller.findByIdAndUpdate(id, { $set: result.data }, { new: true, runValidators: true }).select(
        "storeName storeDescription bankDetails taxId verified"
    );

    res.status(200).json({
        message: "Seller updated successfully",
        seller: {
            id: updatedSeller._id,
            storeName: updatedSeller.storeName,
            storeDescription: updatedSeller.storeDescription,
            bankDetails: updatedSeller.bankDetails,
            taxId: updatedSeller.taxId,
            verified: updatedSeller.verified,
        },
    });
};

const deleteSeller = async (req, res) => {
    const { id } = req.params;
    const seller = await Seller.findByIdAndDelete(id);
    if (!seller) return res.status(404).json({ error: "Seller not found" });

    res.status(200).json({ message: "Seller deleted successfully", seller });
};

export { createSeller, getSeller, getAllSellers, updateSeller, deleteSeller };