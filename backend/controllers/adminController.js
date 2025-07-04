import Admin from '../models/adminModel.js'; // Import the Admin model you provided
import { generateToken } from '../utils/generateToken.js'; // Import your existing generateToken utility

const loginAdmin = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        res.status(400); // Bad Request
        throw new Error('Please enter username/email and password.');
    }

    const admin = await Admin.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (admin) {
        if (!admin.isActive) {
            res.status(401); // Unauthorized
            throw new Error('Account is inactive. Please contact support.');
        }

        const isMatch = await admin.comparePassword(password);

        if (isMatch) {
            generateToken(res, admin._id); // Your generateToken function handles setting the cookie

            await admin.updateLastLogin();

            res.status(200).json({
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                isActive: admin.isActive,
                lastLogin: admin.lastLogin,
                message: 'Admin logged in successfully!'
            });
        } else {
            res.status(401);
            throw new Error('Invalid credentials (password mismatch).');
        }
    } else {
        res.status(401); // Unauthorized
        throw new Error('Invalid credentials (admin not found).');
    }
};

const logoutAdmin = async (req, res) => {
    res.cookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Admin logged out successfully.' });
};

const getAdminProfile = async (req, res) => {
    if (req.admin) {
        res.status(200).json({
            _id: req.admin._id,
            username: req.admin.username,
            email: req.admin.email,
            role: req.admin.role,
            isActive: req.admin.isActive,
            lastLogin: req.admin.lastLogin,
        });
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
};

export {
    loginAdmin,
    logoutAdmin,
    getAdminProfile,
};
