import jwt from "jsonwebtoken";
import sellerModel from "../models/sellerModel.js";

// Note: In JavaScript, you don't need explicit type declarations like in TypeScript.
// The 'req.user' property will be added dynamically.

export const sellerValid = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        // Return a more descriptive error message if no token is found
        return res.status(401).json({ error: "Authentication failed: No token provided." });
    }

    try {
        // Ensure JWT_SECRET is defined. In a real application, you might
        // want to handle this at application startup or with a more robust error.
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ error: "Server configuration error: JWT secret missing." });
        }

        // Verify the token using the secret from environment variables
        // The 'decoded' object will contain the payload you signed into the token (e.g., { id: 'someUserId' })
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the decoded token, excluding the password field
        const user = await sellerModel.findById(decoded.id).select("-password");

        // If no user is found with the ID from the token, it's an authentication failure
        if (!user) {
            return res.status(401).json({ error: "Authentication failed: User not found." });
        }

        // Check if the user has the 'seller' or 'admin' role
        // Assuming 'user.role' is a property on your Mongoose user document
        if (user.role !== 'seller' && user.role !== 'admin') {
            // If the user does not have the required role, deny access
            return res.status(403).json({ error: "Access denied: Insufficient privileges. Seller or admin role required." });
        }

        // Attach the user object to the request for subsequent middleware or route handlers.
        // Using .toObject() converts the Mongoose document to a plain JavaScript object,
        // which can be cleaner to work with and avoids Mongoose-specific overhead in later stages.
        req.user = user.toObject();

        // Call the next middleware function in the stack
        next();
    } catch (err) {
        // Handle specific JWT errors for more informative responses
        if (err instanceof jwt.JsonWebTokenError) {
            // General JWT error (e.g., malformed token, invalid signature)
            return res.status(401).json({ error: `Authentication failed: Invalid token. ${err.message}` });
        } else if (err instanceof jwt.TokenExpiredError) {
            // Token has expired
            return res.status(401).json({ error: "Authentication failed: Token has expired." });
        } else {
            // Catch any other unexpected errors during the process
            console.error("Seller validation error:", err);
            return res.status(500).json({ error: "Internal server error during authentication." });
        }
    }
};
