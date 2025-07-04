import {Product} from "../models/productModel.js";
import User from "../models/userModel.js";
import Tracking from '../models/trackingModel.js';
import mongoose from 'mongoose';

/// Create new tracking
export const createTracking = async (req, res) => {
    try {
        console.log('Request body received:', JSON.stringify(req.body, null, 2));

        const { orderId, userId, items, orderItems, shippingAddress, totalAmount, customerInfo } = req.body;

        // Support both 'items' and 'orderItems' field names
        const orderItemsArray = items || orderItems;

        console.log('Extracted customerInfo:', customerInfo);
        console.log('Extracted shippingAddress:', shippingAddress);
        console.log('Extracted orderItems:', orderItemsArray);

        // Validate required fields
        if (!userId || !orderItemsArray || !Array.isArray(orderItemsArray) || orderItemsArray.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'User ID and items/orderItems array are required'
            });
        }

        if (!customerInfo) {
            return res.status(400).json({
                success: false,
                message: 'Customer information is required'
            });
        }

        if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
            return res.status(400).json({
                success: false,
                message: 'Customer information (firstName, lastName, email, phone) is required',
                received: customerInfo
            });
        }

        // Validate shippingAddress
        if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
            return res.status(400).json({
                success: false,
                message: 'Complete shipping address is required'
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const finalOrderId = orderId || new mongoose.Types.ObjectId();

        // Validate each item and check if products exist
        let calculatedTotal = 0;
        const validatedItems = [];

        for (const item of orderItemsArray) {
            if (!item.productId || !item.quantity || !item.price) {
                return res.status(400).json({
                    success: false,
                    message: 'Each item must have productId, quantity, and price'
                });
            }

            // Check if product exists
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found`
                });
            }

            validatedItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            });

            calculatedTotal += item.quantity * item.price;
        }

        // Use provided totalAmount or calculated total
        const finalTotal = totalAmount || calculatedTotal;

        const trackingDocData = {
            orderId: finalOrderId,
            userId,
            items: validatedItems,
            totalAmount: finalTotal,
            shippingAddress,
            customerInfo
        };

        console.log('Creating tracking document with data:', JSON.stringify(trackingDocData, null, 2));

        const tracking = new Tracking(trackingDocData);

        await tracking.save();

        const populatedTracking = await Tracking.findById(tracking._id)
            .populate('items.productId', 'name category price images')
            .populate('userId', 'name email');

        res.status(201).json({
            success: true,
            message: 'Tracking created successfully',
            data: populatedTracking
        });
    } catch (error) {
        console.error('Error creating tracking:', error);
        console.error('Error details:', error.message);
        if (error.name === 'ValidationError') {
            console.error('Validation errors:', error.errors);
        }
        res.status(500).json({
            success: false,
            message: 'Error creating tracking',
            error: error.message
        });
    }
};

// Add the deleteTracking function
export const deleteTracking = async (req, res) => {
    try {
        const { trackingId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(trackingId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid tracking ID format'
            });
        }

        const tracking = await Tracking.findByIdAndDelete(trackingId);

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: 'Tracking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tracking deleted successfully',
            data: tracking
        });
    } catch (error) {
        console.error('Error deleting tracking:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting tracking',
            error: error.message
        });
    }
};

// Add the getAllTrackings function
export const getAllTrackings = async (req, res) => {
    try {
        // --- Pagination and Filtering Logic ---
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.status) {
            query.status = req.query.status;
        }
        // Add more filters if needed, e.g., date ranges
        if (req.query.startDate && req.query.endDate) {
            query.createdAt = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }
        // --- End Pagination and Filtering Logic ---

        const trackings = await Tracking.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by creation date, newest first

        const totalTrackings = await Tracking.countDocuments(query);
        const totalPages = Math.ceil(totalTrackings / limit);

        res.status(200).json({
            success: true,
            message: 'All trackings fetched successfully',
            data: trackings,
            pagination: {
                totalTrackings,
                currentPage: page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching all trackings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching trackings',
            error: error.message
        });
    }
}; // Removed the extra '}' here

// Add the getTrackingById function
export const getTrackingById = async (req, res) => {
    try {
        const { trackingId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(trackingId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid tracking ID format'
            });
        }

        const tracking = await Tracking.findById(trackingId)
            .populate('items.productId', 'name category price images')
            .populate('userId', 'name email');

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: 'Tracking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: tracking
        });
    } catch (error) {
        console.error('Error fetching tracking by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tracking by ID',
            error: error.message
        });
    }
};

// Add the getTrackingStats function
export const getTrackingStats = async (req, res) => {
    try {
        const stats = await Tracking.aggregate([
            {
                $group: {
                    _id: null,
                    totalTrackings: { $sum: 1 },
                    totalAmountSum: { $sum: '$totalAmount' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalTrackings: 1,
                    totalAmountSum: 1
                }
            }
        ]);

        if (stats.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No tracking data available for statistics',
                data: {
                    totalTrackings: 0,
                    totalAmountSum: 0
                }
            });
        }

        res.status(200).json({
            success: true,
            data: stats[0]
        });
    } catch (error) {
        console.error('Error fetching tracking statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tracking statistics',
            error: error.message
        });
    }
};

export const getUserTrackings = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        // Find trackings associated with the userId
        const trackings = await Tracking.find({ userId: userId })
            .populate('items.productId', 'name category price images')
            .populate('userId', 'name email'); // Populate user details as well

        if (!trackings || trackings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tracking records found for this user'
            });
        }

        res.status(200).json({
            success: true,
            count: trackings.length,
            data: trackings
        });
    } catch (error) {
        console.error('Error fetching user trackings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user trackings',
            error: error.message
        });
    }
};

export const updateTrackingStatus = async (req, res) => {
    try {
        const { trackingId } = req.params;
        const { status } = req.body;

        // Validate trackingId
        if (!mongoose.Types.ObjectId.isValid(trackingId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid tracking ID format'
            });
        }

        // Validate status
        if (!status || typeof status !== 'string' || status.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Tracking status is required and must be a non-empty string'
            });
        }

        // Find and update the tracking record
        const updatedTracking = await Tracking.findByIdAndUpdate(
            trackingId,
            { status: status },
            { new: true, runValidators: true } // Return the updated document and run schema validators
        )
            .populate('items.productId', 'name category price images')
            .populate('userId', 'name email');

        if (!updatedTracking) {
            return res.status(404).json({
                success: false,
                message: 'Tracking record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tracking status updated successfully',
            data: updatedTracking
        });
    } catch (error) {
        console.error('Error updating tracking status:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error when updating status',
                errors: error.errors
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error updating tracking status',
            error: error.message
        });
    }
};
