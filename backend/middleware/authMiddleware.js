import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const protect = async (req, res, next) => {
    let token;

    // 1. Check for token in cookies first (as set by generateToken)
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    // 2. Fallback to Authorization header (if you still want to support it, though less secure for browsers)
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const decoded = jwt.verify(token, secret);

        req.user = await UserModel.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error); // Log the error for debugging
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export const sellerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'seller') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a seller' });
    }
};
