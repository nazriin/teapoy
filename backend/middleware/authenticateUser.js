import jwt from "jsonwebtoken";
// Assuming you have a userModel.js similar to sellerModel.js
import userModel from "../models/userModel.js";

// This middleware is designed to validate a user's JWT and attach the user
// object to the request for subsequent route handlers.

export const userValid = async (req, res, next) => {
    const token = req.cookies.jwt; // Get the JWT token from cookies

    // If no token is found in the cookies, the user is not authenticated
    if (!token) {
        return res.status(401).json({ error: "Authentication failed: No token provided." });
    }

    try {
        // Ensure that the JWT_SECRET environment variable is set
        // It's crucial for verifying the token's authenticity.
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ error: "Server configuration error: JWT secret missing." });
        }

        // Verify the token using the secret. This decodes the payload.
        // The 'decoded' object should contain the user's ID that was signed into the token.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database using the ID from the decoded token.
        // The '-password' ensures that the password hash is not returned with the user object.
        const user = await userModel.findById(decoded.id).select("-password");

        // If no user is found with the decoded ID, the token might be valid but the user doesn't exist
        if (!user) {
            return res.status(401).json({ error: "Authentication failed: User not found." });
        }

        // Attach the found user object (converted to a plain JS object) to the request.
        // This makes user data accessible to subsequent middleware and route handlers.
        req.user = user.toObject();

        // Call the next middleware function in the Express chain.
        // If this is the last middleware before the route handler, the route handler will execute.
        next();
    } catch (err) {
        // Handle specific types of JWT errors to provide more precise feedback
        if (err instanceof jwt.JsonWebTokenError) {
            // This catches errors like malformed tokens or invalid signatures.
            return res.status(401).json({ error: `Authentication failed: Invalid token. ${err.message}` });
        } else if (err instanceof jwt.TokenExpiredError) {
            // This catches tokens that are valid but have passed their expiration time.
            return res.status(401).json({ error: "Authentication failed: Token has expired." });
        } else {
            // Catch any other unexpected errors that might occur during the process.
            // Log the error for server-side debugging.
            console.error("User validation error:", err);
            return res.status(500).json({ error: "Internal server error during authentication." });
        }
    }
};
