import cron from 'node-cron';
import Order from '../models/Order.Model.js';
import HourlySummary from '../models/HourlySummary.Model.js';

cron.schedule('0 * * * *', async () => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalAmount = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$total_amount" } } }
        ]);

        const summary = {
            total_orders: totalOrders,
            total_amount: totalAmount[0]?.total || 0,
            timestamp: new Date().toISOString(),
        };

        await HourlySummary.create(summary);

        console.log("Hourly Order Summary Saved:", summary);
    } catch (error) {
        console.error("Error saving hourly summary:", error);
    }
});
