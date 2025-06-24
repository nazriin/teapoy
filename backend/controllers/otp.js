import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import {generateToken} from "../utils/generateToken.js";
import {Seller} from "../models/sellerModel.js";

export const requestOTPSignup = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Email is required.');
    }

    const userExists = await User.findOne({ email });
    if (userExists && userExists.isVerified) {
        res.status(400);
        throw new Error('User with this email already exists and is verified.');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in the database, replacing any existing for this email
    await OTP.findOneAndUpdate(
        { email },
        { otp },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const message = `
        <h3>Your OTP for Signup</h3>
        <p>Your One-Time Password (OTP) for signup is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 5 minutes. Do not share this with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
    `;

    try {
        await sendEmail({
            email: email,
            subject: 'Your OTP for Signup',
            message: message,
        });

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        // If email sending fails, consider removing the OTP from the DB or marking it as failed
        console.error("Error sending OTP email:", error);
        res.status(500);
        throw new Error('Error sending OTP. Please try again.');
    }
};

export const verifyOTPRegister = async (req, res) => {
    const { name, email, password, role, otp } = req.body;

    if (!name || !email || !password || !role || !otp) {
        res.status(400);
        throw new Error('Please enter all required fields including the OTP.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
        res.status(400);
        throw new Error('User with this email already exists and is verified.');
    }

    const storedOTP = await OTP.findOne({ email });

    if (!storedOTP || storedOTP.otp !== otp) {
        res.status(400);
        throw new Error('Invalid or expired OTP. Please request a new one.');
    }

    // OTP is valid, remove it from the database
    await OTP.deleteOne({ email });

    // Create or update the user
    let user;
    if (existingUser && !existingUser.isVerified) {
        // If user exists but not verified, update their details and verify them
        existingUser.name = name;
        existingUser.password = password; // Password will be hashed by pre-save middleware
        existingUser.role = role;
        existingUser.isVerified = true;
        user = await existingUser.save();
    } else {
        // Create new user
        user = await User.create({
            name,
            email,
            password,
            role,
            isVerified: true // Set to true upon successful OTP verification
        });
    }

    if (user) {
        // If the role is 'seller', create a corresponding Seller entry
        if (user.role === 'seller') {
            const sellerExists = await Seller.findOne({ user: user._id });
            if (!sellerExists) {
                await Seller.create({
                    user: user._id,
                    storeName: `${user.name}'s Store`, // Default store name
                    storeDescription: 'New seller store'
                });
            }
        }

        generateToken(res, user._id); // Generate JWT token for immediate login

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};