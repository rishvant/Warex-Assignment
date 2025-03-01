import express from 'express';
import OrderController from '../controller/Order.Controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, OrderController.createOrder);
router.get('/', authenticate, OrderController.getAllOrders);

export default router; 