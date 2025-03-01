import express from 'express';
import CustomerController from '../controller/Customer.Controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/get_customer/:user_id', authenticate, CustomerController.getCustomersByUserId);
router.post('/create_customer', authenticate, CustomerController.createCustomer);

export default router; 