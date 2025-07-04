import mongoose from 'mongoose';

const trackingSchema = new mongoose.Schema({
    trackingId: {
        type: String,
        required: true,
        unique: true,
        default: () => `PET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: [
            'order_placed',
            'payment_confirmed',
            'preparing_order',
            'in_transit',
            'out_for_delivery',
            'delivered',
            'cancelled',
            'returned'
        ],
        default: 'order_placed'
    },
    statusHistory: [{
        status: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        location: {
            type: String,
            default: ''
        },
        notes: {
            type: String,
            default: ''
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    estimatedDelivery: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true, default: 'US' }
    },
    carrier: {
        name: { type: String, default: 'Pet Express' },
        trackingNumber: { type: String, default: '' }
    },
    customerInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, {
    timestamps: true
});

// Add initial status to history before saving
trackingSchema.pre('save', function(next) {
    if (this.isNew) {
        this.statusHistory.push({
            status: this.status,
            timestamp: new Date(),
            location: 'Pet Shop Warehouse',
            notes: 'Order has been placed and confirmed'
        });
    }
    next();
});

// Method to update status
trackingSchema.methods.updateStatus = function(newStatus, location = '', notes = '') {
    this.status = newStatus;
    this.statusHistory.push({
        status: newStatus,
        timestamp: new Date(),
        location,
        notes
    });
    return this.save();
};

// Static method to get tracking by user
trackingSchema.statics.getByUser = function(userId) {
    return this.find({ userId })
        .populate('items.productId', 'name category price images')
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });
};

// Static method to get tracking by tracking ID
trackingSchema.statics.getByTrackingId = function(trackingId) {
    return this.findOne({ trackingId })
        .populate('items.productId', 'name category price images')
        .populate('userId', 'name email phone');
};

const Tracking = mongoose.model('Tracking', trackingSchema);

export default Tracking;