import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";

const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const userControl = async (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is not set");

        const decoded = jwt.verify(token, secret);

        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Optional: attach user to request if needed
        req.user = user;

        next();
    } catch (error) {
        console.error("JWT validation error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = userControl;