// controllers/wishlistController.js
import mongoose from 'mongoose';
import { Wishlist } from '../models/wishlistModel.js'; // Assuming you have a Wishlist model, notice the .js extension

const sendResponse = (res, statusCode, success, message, data = null) => {
    res.status(statusCode).json({ success, message, data });
};

export const addWItem = async (req, res) => {
    try {
        const { userId, productId, count } = req.body;

        // Validate request body
        if (!userId || !productId) {
            return sendResponse(res, 400, false, 'User ID and Product ID are required.');
        }

        // Validate Mongoose ObjectIDs
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return sendResponse(res, 400, false, 'Invalid User ID or Product ID format.');
        }

        const existingItem = await Wishlist.findOne({ userId, productId });
        if (existingItem) {
            return sendResponse(res, 409, false, 'Item already exists in the wishlist for this user.');
        }

        const newItem = new Wishlist({ userId, productId, count: count || 1 });
        await newItem.save();

        sendResponse(res, 201, true, 'Item added to wishlist successfully.', newItem);
    } catch (error) {
        // Handle duplicate key error (E11000) for the unique index
        if (error.code === 11000) {
            return sendResponse(res, 409, false, 'Duplicate item: This product is already in the wishlist for this user.');
        }
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return sendResponse(res, 400, false, messages.join(', '));
        }
        console.error('Error adding item to wishlist:', error);
        sendResponse(res, 500, false, 'Server error while adding item.');
    }
};

export const getWishlistItems = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId presence
        if (!userId) {
            return sendResponse(res, 400, false, 'User ID is required.');
        }

        console.log(userId)

        // Validate Mongoose ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendResponse(res, 400, false, 'Invalid User ID format.');
        }

        // Find wishlist items and populate product details
        const wishlistItems = await Wishlist.find({ userId })
            .populate('productId', 'name price imageUrl') // Assuming product has name, price, imageUrl fields
            .populate('userId', 'username email'); // Assuming user has username, email fields

        console.log(wishlistItems);

        // If no wishlist items are found, send an empty array
        if (!wishlistItems || wishlistItems.length === 0) {
            return sendResponse(res, 200, true, 'No wishlist items found for this user.', []);
        }

        sendResponse(res, 200, true, 'Wishlist items retrieved successfully.', wishlistItems);
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        sendResponse(res, 500, false, 'Server error while fetching wishlist items.');
    }
};

export const deleteWOneItem = async (req, res) => {
    try {
        const { id } = req.params; // This 'id' refers to the _id of the wishlist item document

        // Validate wishlist item ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, false, 'Invalid Wishlist Item ID format.');
        }

        const deletedItem = await Wishlist.findByIdAndDelete(id);

        if (!deletedItem) {
            return sendResponse(res, 404, false, 'Wishlist item not found.');
        }

        sendResponse(res, 200, true, 'Wishlist item deleted successfully.', deletedItem);
    } catch (error) {
        console.error('Error deleting wishlist item:', error);
        sendResponse(res, 500, false, 'Server error while deleting item.');
    }
};

export const deleteWAllItem = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId presence
        if (!userId) {
            return sendResponse(res, 400, false, 'User ID is required to delete all items.');
        }

        // Validate Mongoose ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendResponse(res, 400, false, 'Invalid User ID format.');
        }

        const deleteResult = await Wishlist.deleteMany({ userId });

        if (deleteResult.deletedCount === 0) {
            return sendResponse(res, 404, false, 'No wishlist items found for this user to delete.');
        }

        sendResponse(res, 200, true, `Successfully deleted ${deleteResult.deletedCount} wishlist items for user ${userId}.`);
    } catch (error) {
        console.error('Error deleting all wishlist items:', error);
        sendResponse(res, 500, false, 'Server error while deleting all items.');
    }
};

export const editWItem = async (req, res) => {
    try {
        const { id } = req.params; // Wishlist item ID
        const { productId, count } = req.body; // New productId or count

        // Validate wishlist item ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, false, 'Invalid Wishlist Item ID format.');
        }

        // Find the existing wishlist item
        const existingItem = await Wishlist.findById(id);
        if (!existingItem) {
            return sendResponse(res, 404, false, 'Wishlist item not found.');
        }

        // Prepare updates
        const updates = {};
        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return sendResponse(res, 400, false, 'Invalid Product ID format.');
            }
            // Check for duplicate product if productId is being changed
            if (existingItem.productId.toString() !== productId) {
                const duplicateCheck = await Wishlist.findOne({
                    userId: existingItem.userId,
                    productId: productId,
                    _id: { $ne: id }, // Exclude the current item from the check
                });
                if (duplicateCheck) {
                    return sendResponse(res, 409, false, 'This product is already in the wishlist for this user.');
                }
            }
            updates.productId = productId;
        }

        if (count !== undefined && count !== null) {
            if (typeof count !== 'number' || count < 1) {
                return sendResponse(res, 400, false, 'Count must be a positive number.');
            }
            updates.count = count;
        }

        // If no valid updates are provided
        if (Object.keys(updates).length === 0) {
            return sendResponse(res, 400, false, 'No valid fields to update (productId or count).');
        }

        // Apply updates and save
        const updatedItem = await Wishlist.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        sendResponse(res, 200, true, 'Wishlist item updated successfully.', updatedItem);
    } catch (error) {
        // Handle duplicate key error (E11000) for the unique index
        if (error.code === 11000) {
            return sendResponse(res, 409, false, 'Duplicate item: This product is already in the wishlist for this user.');
        }
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return sendResponse(res, 400, false, messages.join(', '));
        }
        console.error('Error editing wishlist item:', error);
        sendResponse(res, 500, false, 'Server error while editing item.');
    }
};