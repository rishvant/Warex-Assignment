import mongoose from 'mongoose';

const hourlySummarySchema = new mongoose.Schema({
    total_orders: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const HourlySummary = mongoose.model('HourlySummary', hourlySummarySchema);
export default HourlySummary;
