import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        unique: true
    },
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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order; 