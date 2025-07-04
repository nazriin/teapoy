import mongoose from 'mongoose';
import Basket from '../models/basketModel.js';
import {Product} from '../models/productModel.js';

const sendResponse = (res, statusCode, success, message, data = null) => {
    res.status(statusCode).json({ success, message, data });
};

export const addItem = async (req, res) => {
    try {
        const { productId, count, userId } = req.body;

        // Basic validation
        if (!userId || !productId || count === undefined) {
            return sendResponse(res, 400, false, 'User ID, Product ID, and count are required.');
        }

        if (typeof count !== 'number' || count <= 0) {
            return sendResponse(res, 400, false, 'Count must be a positive number.');
        }

        // Validate Product ID format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return sendResponse(res, 400, false, 'Invalid Product ID format.');
        }

        // Check if product exists and has enough stock
        const product = await Product.findById(productId);
        if (!product) {
            return sendResponse(res, 404, false, 'Product not found.');
        }
        if (product.stock < count) {
            return sendResponse(res, 400, false, `Not enough stock available. Only ${product.stock} left.`);
        }

        // Check if the item already exists in the basket for this user
        let basketItem = await Basket.findOne({ userId, productId });

        if (basketItem) {
            // If item exists, update the count
            // Ensure the new total count does not exceed stock
            const newCount = basketItem.count + count;
            if (product.stock < newCount) {
                return sendResponse(res, 400, false, `Adding this quantity would exceed available stock. Only ${product.stock - basketItem.count} more can be added.`);
            }
            basketItem.count = newCount;
            await basketItem.save();
            sendResponse(res, 200, true, 'Item count updated in basket successfully.', basketItem);
        } else {
            // If item does not exist, create a new one
            const newItem = new Basket({ userId, productId, count });
            await newItem.save();
            sendResponse(res, 201, true, 'Item added to basket successfully.', newItem);
        }
    } catch (error) {
        // Handle Mongoose duplicate key error (if the unique index is violated, though less likely with update logic)
        if (error.code === 11000) {
            return sendResponse(res, 409, false, 'Duplicate item: This product is already in the basket for this user.');
        }
        console.error('Error adding/updating item in basket:', error);
        sendResponse(res, 500, false, 'Server error while adding/updating item.');
    }
};

export const getBasketItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return sendResponse(res, 400, false, 'User ID is required.');
        }

        const basketItems = await Basket.find({ userId }).populate('productId');

        if (!basketItems) {
            return sendResponse(res, 200, true, 'Basket items retrieved successfully.', []);
        }

        sendResponse(res, 200, true, 'Basket items retrieved successfully.', basketItems);

    } catch (error) {
        console.error('Error fetching basket items:', error);
        sendResponse(res, 500, false, 'Server error while fetching basket items.');
    }
};

export const editItem = async (req, res) => {
    const { id } = req.params; // The ID of the basket entry itself
    const { count, userId } = req.body; // Get userId from request body

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, 400, false, 'Invalid Basket Item ID format.');
    }

    // Check if userId is provided
    if (!userId) {
        return sendResponse(res, 400, false, 'User ID is required.');
    }

    if (count === undefined) {
        return sendResponse(res, 400, false, 'Count is required.');
    }
    if (typeof count !== 'number' || count <= 0) {
        return sendResponse(res, 400, false, 'Count must be a positive number.');
    }

    try {
        // Find the basket item
        const basketItem = await Basket.findById(id);

        if (!basketItem) {
            return sendResponse(res, 404, false, 'Item not found in basket.');
        }

        // Ensure the item belongs to the specified user
        if (basketItem.userId.toString() !== userId.toString()) {
            return sendResponse(res, 403, false, 'Not authorized to edit this basket item.');
        }

        // Check if product exists and has enough stock for the new count
        const product = await Product.findById(basketItem.productId);
        if (!product) {
            return sendResponse(res, 404, false, 'Associated product not found.');
        }
        if (product.stock < count) {
            return sendResponse(res, 400, false, `Not enough stock available. Only ${product.stock} left.`);
        }

        // Update the count
        basketItem.count = count;
        const updatedItem = await basketItem.save();

        sendResponse(res, 200, true, 'Basket item updated successfully.', updatedItem);
    } catch (error) {
        console.error('Error editing item in basket:', error);
        sendResponse(res, 500, false, 'Server error. Could not edit item in basket.');
    }
};

export const deleteOneItem = async (req, res) => {
    const { id } = req.params; // The ID of the basket entry itself
    const { userId } = req.body; // Get userId from request body

    // Basic validation for the basket item ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, 400, false, 'Invalid Basket Item ID format.');
    }

    // Check if userId is provided
    if (!userId) {
        return sendResponse(res, 400, false, 'User ID is required.');
    }

    try {
        // Find and delete the item, ensuring it belongs to the user
        const deletedItem = await Basket.findOneAndDelete({ _id: id, userId });

        if (!deletedItem) {
            return sendResponse(res, 404, false, 'Basket item not found or not authorized to delete.');
        }

        sendResponse(res, 200, true, 'Item successfully removed from basket.', deletedItem);
    } catch (error) {
        console.error('Error deleting one item from basket:', error);
        sendResponse(res, 500, false, 'Server error. Could not delete item.');
    }
};

export const deleteAllItem = async (req, res) => {
    const { userId } = req.params;

    // Basic validation
    if (!userId) {
        return sendResponse(res, 400, false, 'User ID is required to delete all items.');
    }

    try {
        const deleteResult = await Basket.deleteMany({ userId });

        if (deleteResult.deletedCount === 0) {
            return sendResponse(res, 200, true, 'Basket is already empty.');
        }

        sendResponse(res, 200, true, `Successfully cleared the basket. ${deleteResult.deletedCount} items were removed.`);
    } catch (error) {
        console.error('Error deleting all items from basket:', error);
        sendResponse(res, 500, false, 'Server error. Could not clear basket.');
    }
};