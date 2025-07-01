
import { Seller } from '../models/sellerModel.js';
import { generateToken } from '../utils/generateToken.js';
import UserModel from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role, storeName, storeDescription } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        const user = new UserModel({ name, email, password, role });
        await user.save();

        if (role === 'seller') {
            if (!storeName) {
                return res.status(400).json({ message: "Store name is required for sellers." });
            }
            const seller = new Seller({
                user: user._id,
                storeName,
                storeDescription,
            });
            await seller.save();
        }

        res.status(201).json({ message: "Registration successful", role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: `You are not registered as ${role}.` });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password." });
        }

        const token = generateToken(user._id, user.role);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        });

        res.json({ message: "Login successful", role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
    res.status(200).json(req.user);
};

