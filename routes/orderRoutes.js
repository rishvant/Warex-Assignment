import express from 'express';
import OrderController from '../controller/Order.Controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/get_orders', authenticate, authorizeAdmin, OrderController.getAllOrders);
router.get('/get_orders/:user_id', authenticate, OrderController.getOrdersByUserId);
router.get('/hourly_summary', authenticate, authorizeAdmin, OrderController.getHourlySummary);
router.post('/create_order', authenticate, OrderController.createOrder);

export default router; 