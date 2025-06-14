import { z } from "zod";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    surname: z.string().optional(),
    role: z.enum(["user", "seller", "admin"]),
    phone: z.string().optional(),
    address: z
        .object({
            street: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),
            zipCode: z.string().optional(),
        })
        .optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    surname: z.string().optional(),
    role: z.enum(["user", "seller", "admin"]).optional(),
    phone: z.string().optional(),
    address: z
        .object({
            street: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),
            zipCode: z.string().optional(),
        })
        .optional(),
});

const createUser = async (req, res) => {
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const { name, email, password, surname, role, phone, address } = result.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = await User.create({
        name,
        email,
        password,
        surname,
        role,
        phone,
        address,
    });

    generateToken(res, newUser._id.toString());

    res.status(201).json({
        message: "User created successfully",
        user: { id: newUser._id, name, email, role },
    });
};

const loginUser = async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await user.passwordControl(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    generateToken(res, user._id.toString());

    res.status(200).json({
        message: "Logged in successfully",
        user: { id: user._id, name: user.name, email, role: user.role },
    });
};

const logout = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out" });
};

const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });

    const user = await User.findById(id).select("name email role");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role });
};

const getAllUsers = async (req, res) => {
    const { name } = req.query;
    const filter = {};

    if (name && typeof name === "string") {
        filter.$or = [
            { name: { $regex: name, $options: "i" } },
            { surname: { $regex: name, $options: "i" } },
        ];
    }

    try {
        const users = await User.find(filter).select("name surname email role phone");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedUser = await User.findByIdAndUpdate(id, { $set: result.data }, { new: true, runValidators: true }).select(
        "name surname email role phone address"
    );

    res.status(200).json({
        message: "User updated successfully",
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            address: updatedUser.address,
        },
    });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user });
};

export { createUser, loginUser, logout, getUser, getAllUsers, updateUser, deleteUser };