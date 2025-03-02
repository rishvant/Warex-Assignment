import Order from '../models/Order.Model.js';
import SKU from '../models/Sku.Model.js';
import Customer from '../models/Customer.Model.js';
import { notifyAdmins } from '../utils/websocket.js';
import mongoose from 'mongoose';
import HourlySummary from '../models/HourlySummary.Model.js';

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { customer_id, sku_id, quantity, rate } = req.body;

            if (!customer_id || !sku_id || !quantity || !rate) {
                return res.status(400).json({ error: "Bad Request: Missing required fields" });
            }

            if (!mongoose.Types.ObjectId.isValid(customer_id)) {
                return res.status(400).json({ error: "Invalid customer ID format" });
            }
            if (!mongoose.Types.ObjectId.isValid(sku_id)) {
                return res.status(400).json({ error: "Invalid SKU ID format" });
            }

            const lastOrder = await Order.findOne()
                .sort({ createdAt: -1 });

            let nextOrderId = "OD-00001";
            if (lastOrder.order_id) {
                const lastNumber = parseInt(lastOrder.order_id?.split("-")[1]);
                nextOrderId = `OD-${String(lastNumber + 1).padStart(5, "0")}`;
            }

            const customer = await Customer.findById(customer_id);
            const sku = await SKU.findById(sku_id);
            if (!customer) {
                return res.status(404).json({ error: "Customer not found" });
            }
            if (!sku) {
                return res.status(404).json({ error: "SKU not found" });
            }

            const total_amount = quantity * rate;
            const newOrder = new Order({
                order_id: nextOrderId,
                customer_id,
                sku_id,
                quantity,
                rate,
                total_amount,
                user_id: req.user.userId
            });
            await newOrder.save();

            notifyAdmins(newOrder);

            res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            res.status(500).json({ error: "Error creating order", details: error.message });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
                .populate('customer_id')
                .populate('sku_id');

            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error fetching orders", details: error.message });
        }
    },
    getOrdersByUserId: async (req, res) => {
        try {
            const { user_id } = req.params;
            const orders = await Order.find({ user_id })
                .populate('customer_id')
                .populate('sku_id');

            if (orders.length === 0) {
                return res.status(404).json({ message: "No orders found for this user" });
            }

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ error: "Error retrieving orders", details: error.message });
        }
    },
    getHourlySummary: async (req, res) => {
        try {
            const summaries = await HourlySummary
                .find()
                .sort({ timestamp: -1 });

            return res.status(200).json({ summaries });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }
}

export default OrderController;