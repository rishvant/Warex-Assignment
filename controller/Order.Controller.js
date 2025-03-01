import Order from '../models/Order.Model.js';
import SKU from '../models/Sku.Model.js';
import Customer from '../models/Customer.Model.js';
import { notifyAdmins } from '../utils/websocket.js';

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { customer_id, sku_id, quantity, rate } = req.body;

            // Validate input
            if (!customer_id || !sku_id || !quantity || !rate) {
                return res.status(400).json({ error: "Bad Request: Missing required fields" });
            }

            // Check if customer and SKU exist
            const customer = await Customer.findById(customer_id);
            const sku = await SKU.findById(sku_id);
            if (!customer) {
                return res.status(404).json({ error: "Customer not found" });
            }
            if (!sku) {
                return res.status(404).json({ error: "SKU not found" });
            }

            const total_amount = quantity * rate;
            const newOrder = new Order({ customer_id, sku_id, quantity, rate, total_amount, userId: req.user._id });
            await newOrder.save();

            // Notify admins via WebSocket
            notifyAdmins(newOrder);

            res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            res.status(500).json({ error: "Error creating order", details: error.message });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.user._id }).populate('customer_id').populate('sku_id'); // Fetch orders for the user
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error fetching orders", details: error.message });
        }
    }
}

export default OrderController;