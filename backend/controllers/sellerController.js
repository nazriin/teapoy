import { z } from 'zod';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';

// Zod schema for createSeller validation
const createSellerSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    storeName: z.string().trim().min(1, 'Store name is required'),
    storeDescription: z.string().trim().max(500, 'Store description must be 500 characters or less').optional(),
    role: z.literal('seller', { errorMap: () => ({ message: 'Role must be seller for this endpoint' }) }),
});

// Zod schema for loginSeller validation
const loginSellerSchema = z.object({
    email: z.string().email('Invalid email address').toLowerCase(),
    password: z.string().min(1, 'Password is required'),
});

// Middleware to validate createSeller request body with Zod
export const createSellerValidation = async (req, res, next) => {
    try {
        await createSellerSchema.parseAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

// Middleware to validate loginSeller request body with Zod
export const loginSellerValidation = async (req, res, next) => {
    try {
        await loginSellerSchema.parseAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

// POST /api/seller
export const createSeller = async (req, res) => {
    try {
        const { name, email, password, storeName, storeDescription, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const existingSeller = await Seller.findOne({ storeName });
        if (existingSeller) {
            return res.status(400).json({ message: 'Store name already in use' });
        }

        // Create User with role 'seller'
        const user = new User({
            name,
            email,
            password,
            role: 'seller',
        });

        await user.save();

        // Create Seller document
        const seller = new Seller({
            userId: user._id,
            storeName,
            storeDescription,
        });

        await seller.save();

        res.status(201).json({
            message: 'Seller created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            seller: {
                id: seller._id,
                storeName: seller.storeName,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /api/seller/login
export const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with role 'seller'
        const user = await User.findOne({ email, role: 'seller' });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Find associated seller document
        const seller = await Seller.findOne({ userId: user._id });
        if (!seller) {
            return res.status(404).json({ message: 'Seller profile not found' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            seller: {
                id: seller._id,
                storeName: seller.storeName,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Placeholder for other functions
export const getAllSellers = async (req, res) => {};
export const getSeller = async (req, res) => {};
export const updateSeller = async (req, res) => {};
export const deleteSeller = async (req, res) => {};