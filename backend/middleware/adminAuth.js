import Admin from '../models/adminModel.js';
import jwt from "jsonwebtoken";
import {configDotenv} from "dotenv";
configDotenv()

export const protectAdmin = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id).select('-password');

            if (admin) {
                req.admin = admin;
                next();
            } else {
                res.status(401);
            }
        } catch (error) {
            console.error(error);
            res.status(401);
        }
    } else {
        res.status(401);
    }
};