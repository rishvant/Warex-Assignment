import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    sku_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKU',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for authentication
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order; 